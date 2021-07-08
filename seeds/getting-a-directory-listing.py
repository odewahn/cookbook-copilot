"""
You want to get a list of the files contained in a directory on the filesystem.
"""


def list_files(dir):
    import os

    for root, dirs, files in os.walk(dir):
        for file in files:
            print(os.path.join(root, file))


print("Print test value for Getting a Directory Listing")
print(list_files("/Users/odewahn/Desktop/cookbook-copilot"))
