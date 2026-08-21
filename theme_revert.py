import os

replacements = {
    'bg-[var(--background)]': 'bg-[#0a0a0a]',
    'text-gray-900/20': 'text-white/20',
    'text-gray-900': 'text-white',
    'text-gray-600': 'text-gray-400',
    'text-gray-700': 'text-gray-300',
    'text-gray-800': 'text-gray-200',
    'border-black/10': 'border-white/20',
    'border-black/5': 'border-white/10',
    'bg-black/10': 'bg-white/10',
    'bg-black/5': 'bg-white/5',
    'bg-white/60': 'bg-black/40',
    'bg-white/50': 'bg-black/50',
    'bg-white': 'bg-black',
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
