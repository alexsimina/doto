#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct TrieNode {
    TrieNode* children[26];
    bool is_end_of_word;

    TrieNode() {
        is_end_of_word = false;
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
    }
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    void insert(const string& key) {
        TrieNode* curr = root;

        for (int i = 0; i < key.length(); i++) {
            int index = key[i] - 'a';
            if (curr->children[index] == nullptr) {
                curr->children[index] = new TrieNode();
            }
            curr = curr->children[index];
        }

        curr->is_end_of_word = true;
    }

    bool search(const string& key) {
        TrieNode* curr = root;

        for (int i = 0; i < key.length(); i++) {
            int index = key[i] - 'a';
            if (curr->children[index] == nullptr) {
                return false;
            }
            curr = curr->children[index];
        }

        return curr != nullptr && curr->is_end_of_word;
    }
};

int main() {
    Trie trie;
    
    vector<string> keys = {"the", "a", "there", "answer", "any", "by", "bye", "their"};
    for (const string& key : keys) {
        trie.insert(key);
    }

    cout << "Search 'the': " << (trie.search("the") ? "Found" : "Not Found") << "\n";
    cout << "Search 'these': " << (trie.search("these") ? "Found" : "Not Found") << "\n";
    cout << "Search 'their': " << (trie.search("their") ? "Found" : "Not Found") << "\n";
    cout << "Search 'thaw': " << (trie.search("thaw") ? "Found" : "Not Found") << "\n";

    return 0;
}
