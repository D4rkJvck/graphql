#!/bin/bash

desired_branch="main"
username="your_username"
email="your_email"

# Prints its first argument...
# Adds a 1 second cooldown...
log() {
    echo -e "$1"
    sleep 1
}

# Checks if there is already a username and email in configuration...
# If no username or email if found, it will config it...
check_credentials() {
    log "\nChecking credentials..."

    if ! git config --get user.name || ! git config --get user.email; then
        log "No Credentials found!!!"

        log "Configuring credentials..."
        git config user.name "$username"
        git config user.email "$email"
    fi

    log "Credentials have been configured successfully!"
}

# Checks if we are in the desired branch before adding files...
# Exits the program is we're in a different branch to prevent confusion...
check_branch() {
    log "\nChecking branch..."
    git branch -a

    if [ "$(git rev-parse --abbrev-ref HEAD)" != "$desired_branch" ]; then
        log "[WARNING] Not on branch $desired_branch..."
        log "Please restart..."
        exit 1
    fi

    log "You're on branch $desired_branch!"
}

# Adds the files given as arguments...
# If there is no arguments, it adds all files...
add_files() {
    log "\nAdding files..."

    if [ $# -eq 0 ]; then
        log "No Files specified..."

        log "Adding all changes..."
        git add .
    else
        log "Adding Specified files..."

        for file in "$@"; do
            git add "$file"
            log "Added: $file"
        done
    fi

    log "Files added successfully!"
}

# Prompts the user for a commit message...
# Then commits the changes...
# Then pushes the changes...
# Cannot be called with auto_push() at the same time...
commit_and_push() {
    log "\nTime to push changes..."

    git status
    read -r -p "Enter Commit Message: " commit_message
    git commit -a -m "$commit_message"
    git push origin "$desired_branch"
    git push github "$desired_branch"

    log "Well done!"
}

# Adds files, then commits with a autogenerated message, then pushes...
# All in a defined time interval...
# Not used, needs further investigations...
# Requires commit_and_push() to be desactivated...
auto_push() {
    i=1
    # Continuous process...
    while true; do
        if [[ -n $(git status -s) ]]; then
            add_files "$@"

            log "Status:"
            git status

            git commit -a -m "Auto Commit - $i"
            git push origin master

            i=$((i + 1))
        fi
        sleep 1200
    done
}

#_________________________________________________________________________
#

main() {
    check_credentials
    check_branch
    add_files "$@"
    commit_and_push
    # auto_push
}

main "$@"
