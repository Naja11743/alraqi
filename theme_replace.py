import os

replacements = {
    'bg-[#0a0a0a]': 'bg-[var(--background)]',
    'text-white': 'text-gray-900',
    'text-gray-400': 'text-gray-600',
    'text-gray-300': 'text-gray-700',
    'border-white/10': 'border-black/5',
    'border-white/5': 'border-black/5',
    'border-white/20': 'border-black/10',
    'bg-white/5': 'bg-black/5',
    'bg-white/10': 'bg-black/10',
    'bg-black/40': 'bg-white/60',
    'bg-black/50': 'bg-white/50',
    'text-gray-200': 'text-gray-800',
    'bg-black': 'bg-white',
    'text-white/20': 'text-gray-900/20'
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
