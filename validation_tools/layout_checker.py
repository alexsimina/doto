import sys
import os
import re

# Dimensiunile placutelor (cards)
CARD_W = 270
CARD_H = 150

# Margini suplimentare ale casetelor capitolelor
DOMAIN_PADDING_X = 180
DOMAIN_PADDING_Y = 140

def main():
    print("=== VERIFICATOR SUPRAPUNERI SYLLABUS TREE ===")
    
    # Determinare cai relative
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    syllabus_tree_path = os.path.join(root_dir, "dashboard", "src", "components", "SyllabusTree.jsx")
    syllabus_data_path = os.path.join(root_dir, "dashboard", "src", "data", "syllabusData.js")

    if not os.path.exists(syllabus_tree_path):
        print(f"Error: Could not find SyllabusTree.jsx at {syllabus_tree_path}")
        sys.exit(1)
        
    if not os.path.exists(syllabus_data_path):
        print(f"Error: Could not find syllabusData.js at {syllabus_data_path}")
        sys.exit(1)

    # 1. Citire si parcurgere SyllabusTree.jsx pentru layoutOverrides
    with open(syllabus_tree_path, "r", encoding="utf-8") as f:
        tree_content = f.read()

    match_overrides = re.search(r"const layoutOverrides\s*=\s*\{([\s\S]*?)\};", tree_content)
    if not match_overrides:
        print("Error: Could not find layoutOverrides dictionary in SyllabusTree.jsx")
        sys.exit(1)

    block = match_overrides.group(1)
    layout_overrides = {}
    for line in block.splitlines():
        line = re.sub(r"//.*", "", line).strip()
        if not line:
            continue
        m = re.match(r"['\"]?(\w+)['\"]?\s*:\s*\{\s*x\s*:\s*(-?\d+)\s*,\s*y\s*:\s*(-?\d+)\s*\}", line)
        if m:
            node_id, x, y = m.groups()
            layout_overrides[node_id] = {"x": int(x), "y": int(y)}

    print(f"Loaded {len(layout_overrides)} node coordinates from SyllabusTree.jsx.")

    # 2. Citire si parcurgere syllabusData.js pentru domainGroups
    with open(syllabus_data_path, "r", encoding="utf-8") as f:
        data_content = f.read()

    match_domain = re.search(r"domainGroups\s*=\s*\[([\s\S]*?)\]", data_content)
    if not match_domain:
        print("Error: Could not find domainGroups array in syllabusData.js")
        sys.exit(1)

    domain_block = match_domain.group(1)
    domain_groups = {}
    matches = re.finditer(r"\{\s*id\s*:\s*['\"](\w+)['\"].*?nodes\s*:\s*\[([\s\S]*?)\]\s*\}", domain_block)
    for m in matches:
        d_id = m.group(1)
        nodes_str = m.group(2)
        nodes = re.findall(r"['\"](\w+)['\"]", nodes_str)
        domain_groups[d_id] = nodes

    # 3. Verificare suprapuneri nod-la-nod
    node_overlaps = []
    node_ids = list(layout_overrides.keys())
    for i in range(len(node_ids)):
        for j in range(i + 1, len(node_ids)):
            n1 = node_ids[i]
            n2 = node_ids[j]
            c1 = layout_overrides[n1]
            c2 = layout_overrides[n2]
            
            dx = abs(c1['x'] - c2['x'])
            dy = abs(c1['y'] - c2['y'])
            
            if dx < CARD_W and dy < CARD_H:
                node_overlaps.append((n1, n2, dx, dy))
                
    # 4. Calculare si verificare bounding-boxes domenii
    domain_bounds = {}
    for d_id, nodes in domain_groups.items():
        coords = [layout_overrides[n] for n in nodes if n in layout_overrides]
        if not coords:
            continue
        xs = [c['x'] for c in coords]
        ys = [c['y'] for c in coords]
        
        min_x = min(xs) - DOMAIN_PADDING_X
        max_x = max(xs) + DOMAIN_PADDING_X
        min_y = min(ys) - DOMAIN_PADDING_Y
        max_y = max(ys) + DOMAIN_PADDING_Y
        
        domain_bounds[d_id] = {
            'min_x': min_x, 'max_x': max_x,
            'min_y': min_y, 'max_y': max_y
        }

    domain_overlaps = []
    domains = list(domain_bounds.keys())
    for i in range(len(domains)):
        for j in range(i + 1, len(domains)):
            d1 = domains[i]
            d2 = domains[j]
            b1 = domain_bounds[d1]
            b2 = domain_bounds[d2]
            
            overlap_x = not (b1['max_x'] < b2['min_x'] or b2['max_x'] < b1['min_x'])
            overlap_y = not (b1['max_y'] < b2['min_y'] or b2['max_y'] < b1['min_y'])
            
            if overlap_x and overlap_y:
                domain_overlaps.append((d1, d2))

    # Raportare rezultate
    has_errors = False
    
    if node_overlaps:
        print(f"\n[ERROR] S-au gasit {len(node_overlaps)} suprapuneri de noduri:")
        for n1, n2, dx, dy in node_overlaps[:15]:
            print(f"   - {n1} si {n2} se suprapun (dx: {dx}px, dy: {dy}px)")
        if len(node_overlaps) > 15:
            print(f"   ... si inca {len(node_overlaps) - 15} altele.")
        has_errors = True
    else:
        print("\n[OK] Nodurile sunt perfect spaciate (0 suprapuneri)!")

    if domain_overlaps:
        print(f"\n[ERROR] S-au gasit {len(domain_overlaps)} suprapuneri de capitole (bounding boxes):")
        for d1, d2 in domain_overlaps:
            print(f"   - Domeniul '{d1}' se suprapune cu domeniul '{d2}'")
        has_errors = True
    else:
        print("[OK] Capitolele (bounding boxes) sunt perfect izolate si nu se suprapun deloc!")

    if has_errors:
        print("\n>>> VALIDARE ESUATA! Va rugam sa corectati coordonatele de mai sus.")
        sys.exit(1)
    else:
        print("\n>>> VALIDARE REUSITA! Harta este gata de utilizare.")
        sys.exit(0)

if __name__ == '__main__':
    main()
