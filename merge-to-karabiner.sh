#!/bin/bash
# merge-karabiner.sh

# Configuration - adjust these paths as needed
DOTFILES_CONFIG="${DOTFILES_CONFIG:-../dotfiles/.config/karabiner/karabiner.json}"
GENERATED_CONFIG="${GENERATED_CONFIG:-./karabiner.json}"

# Validate files exist
if [[ ! -f "$DOTFILES_CONFIG" ]]; then
    echo "Error: Dotfiles config not found at: $DOTFILES_CONFIG"
    exit 1
fi

if [[ ! -f "$GENERATED_CONFIG" ]]; then
    echo "Error: Generated config not found at: $GENERATED_CONFIG"
    echo "Run 'yarn run build' first to generate it."
    exit 1
fi

# Create backup
cp "$DOTFILES_CONFIG" "$DOTFILES_CONFIG.backup"

# Create temp file in same directory to avoid cross-device move issues
TEMP_FILE=$(mktemp)

# Merge: keep non-Hyper rules from dotfiles, add all Hyper rules from generated
jq -s '
  .[0] as $dotfiles | .[1] as $generated |
  ($dotfiles.profiles[0].complex_modifications.rules | map(select(.description | startswith("Hyper Key") | not))) as $kept |
  ($generated.profiles[0].complex_modifications.rules) as $hyper |
  $dotfiles | .profiles[0].complex_modifications.rules = ($kept + $hyper)
' "$DOTFILES_CONFIG" "$GENERATED_CONFIG" > "$TEMP_FILE"

# Validate output is valid JSON before replacing
if jq empty "$TEMP_FILE" 2>/dev/null; then
    mv "$TEMP_FILE" "$DOTFILES_CONFIG"
    echo "Merged successfully!"
    echo "   Backup saved to: $DOTFILES_CONFIG.backup"
else
    echo "Error: Merge produced invalid JSON"
    rm -f "$TEMP_FILE"
    exit 1
fi
