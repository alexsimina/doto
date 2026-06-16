#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const int INF = 1e9;

void dijkstra(int n, int start, const vector<vector<pair<int, int>>>& adj) {
    vector<int> dist(n + 1, INF);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        int d = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (d > dist[u]) continue;

        for (auto edge : adj[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }

    for (int i = 1; i <= n; ++i) {
        if (dist[i] == INF) cout << "INF ";
        else cout << dist[i] << " ";
    }
    cout << "\n";
}

int main() {
    int n = 5;
    vector<vector<pair<int, int>>> adj(n + 1);
    
    // Hardcoded graph
    adj[1].push_back({2, 10});
    adj[1].push_back({3, 5});
    adj[2].push_back({3, 2});
    adj[2].push_back({4, 1});
    adj[3].push_back({2, 3});
    adj[3].push_back({4, 9});
    adj[3].push_back({5, 2});
    adj[4].push_back({5, 4});
    adj[5].push_back({1, 7});
    adj[5].push_back({4, 6});

    dijkstra(n, 1, adj);

    return 0;
}
