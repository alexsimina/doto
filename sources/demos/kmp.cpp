#include <iostream>
#include <vector>
#include <string>

using namespace std;

void compute_lps(const string& pat, vector<int>& lps) {
    int m = pat.length();
    int len = 0;
    lps[0] = 0;

    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

void kmp_search(const string& txt, const string& pat) {
    int n = txt.length();
    int m = pat.length();

    vector<int> lps(m);
    compute_lps(pat, lps);

    int i = 0; // index for txt
    int j = 0; // index for pat
    while (n - i >= m - j) {
        if (pat[j] == txt[i]) {
            j++;
            i++;
        }

        if (j == m) {
            cout << "Found pattern at index " << i - j << "\n";
            j = lps[j - 1];
        } else if (i < n && pat[j] != txt[i]) {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                i = i + 1;
            }
        }
    }
}

int main() {
    string txt = "ABABDABACDABABCABAB";
    string pat = "ABABCABAB";
    cout << "Text: " << txt << "\n";
    cout << "Pattern: " << pat << "\n";
    kmp_search(txt, pat);
    return 0;
}
