import os

replacements = {
    'â‚¹': '₹',
    'â‚¬': '€',
    'âŒ˜': '⌘',
    'â†‘': '↑',
    'â†“': '↓'
}

for root, dirs, files in os.walk('C:/Users/HP/Downloads/stitch_al_raqi_gold_dashboard/src'):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            changed = False
            for k, v in replacements.items():
                if k in content:
                    content = content.replace(k, v)
                    changed = True
                    
            if changed:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
