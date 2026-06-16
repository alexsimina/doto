#include <iostream>
#include <vector>

using namespace std;

void dfs(int node, vector<bool>& visited, const vector<vector<int>>& graph) {
    visited[node] = true;
    cout << node << " ";

    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited, graph);
        }
    }
}

int main() {
    int n = 6;
    vector<vector<int>> graph(n + 1);

    // Hardcoded graph
    graph[1].push_back(2);
    graph[1].push_back(3);
    graph[2].push_back(1);
    graph[2].push_back(4);
    graph[2].push_back(5);
    graph[3].push_back(1);
    graph[3].push_back(6);
    graph[4].push_back(2);
    graph[5].push_back(2);
    graph[6].push_back(3);

    vector<bool> visited(n + 1, false);

    cout << "DFS traversal starting from node 1:\n";
    dfs(1, visited, graph);
    cout << "\n";

    return 0;
}
