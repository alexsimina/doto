#include <iostream>
#include <vector>
#include <queue>

using namespace std;

void bfs(int start, const vector<vector<int>>& graph) {
    int n = graph.size() - 1;
    vector<bool> visited(n + 1, false);
    queue<int> q;

    visited[start] = true;
    q.push(start);

    while (!q.empty()) {
        int node = q.front();
        q.pop();

        cout << node << " ";

        for (int neighbor : graph[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
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

    cout << "BFS traversal starting from node 1:\n";
    bfs(1, graph);
    cout << "\n";

    return 0;
}
