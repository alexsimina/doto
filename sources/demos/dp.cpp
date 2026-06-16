#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int knapsack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp_table(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w) {
                dp_table[i][w] = max(val[i - 1] + dp_table[i - 1][w - wt[i - 1]], dp_table[i - 1][w]);
            } else {
                dp_table[i][w] = dp_table[i - 1][w];
            }
        }
    }

    return dp_table[n][W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    int n = val.size();

    cout << "Maximum value in Knapsack = " << knapsack(W, wt, val, n) << "\n";

    return 0;
}
