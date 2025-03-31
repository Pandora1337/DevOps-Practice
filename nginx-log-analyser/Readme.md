# Nginx Log Aanalyser

This project is a simple command-line tool to analyze Nginx access logs. It's designed to practice basic shell scripting skills.

## Requirements
Create a shell script that reads the log file and provides the following information from the logfile:

- Top 5 IP addresses with the most requests
- Top 5 most requested paths
- Top 5 response status codes
- Top 5 user agents

## Usage

1. Download script
2. Make executable with
```
chmod +x analyse.sh 
```
3. Run the command
```
./analyse.sh <PATH/TO/FILENAME>
```

## Explanation

### Prelude:
The `|` sign means the output of the command will be used as input for the next command
So in `ls | sort` the output will be a sorted list of folder contents

### Order of operations:
1. `awk` grabs the $n-field block (white space separated) on each line in a file
2. `sort` orders the prev output in ascending order
3. `uniq -c` removes duplicate lines and prints their number of occurances as prefix, i.e:
    ```
    19 192.168.1.1
    55 192.168.1.2
    ```
4. `sort -nr` the `-n` flag treats input as numbers, and `-r` orders them in reverse order (from highest to lowest)
5. `awk` formats the previous output in a more readable format
6. `head` command outputs the first part of its input. The `-n` flag specifies the number of lines to show
7. `awk -F '"'` means the character for distinguishing fields is set to the `"`, instead of the default space ` `, which is also why the field number is different on the last line of code

## Output
The output of nginx-access.log:
```
Top 5 IP addresses with the most requests:
    178.128.94.113 - 1087 requests
    142.93.136.176 - 1087 requests
    138.68.248.85 - 1087 requests
    159.89.185.30 - 1086 requests
    86.134.118.70 - 277 requests

Top 5 most requested paths:
    /v1-health - 4560 requests
    / - 270 requests
    /v1-me - 232 requests
    /v1-list-workspaces - 127 requests
    /v1-list-timezone-teams - 75 requests

Top 5 response status codes:
    200 - 5740 requests
    404 - 937 requests
    304 - 621 requests
    400 - 192 requests
    "-" - 31 requests

Top 5 user agents:
   4347 requests - DigitalOcean Uptime Probe 0.22.0 (https://digitalocean.com)
    513 requests - Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
    332 requests - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
    294 requests - Custom-AsyncHttpClient
    282 requests - Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
```