import os
import re

root_dir = '/home/taskmaster/abiapay-agents-pos'
files_with_scss_path = os.path.join(root_dir, 'files_with_scss.txt')
all_styles_path = os.path.join(root_dir, 'pages/all-components-styles.scss')

with open(all_styles_path, 'w') as f:
    f.write('// Auto-generated combined styles\n')

with open(files_with_scss_path, 'r') as f:
    files = [line.strip() for line in f if line.strip()]

for file_path in files:
    if not os.path.exists(file_path):
        continue
    
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Find patterns like import "./style.scss" or import './SearchableDropdown.scss'
    # but not import styles from ...
    matches = re.findall(r'import\s+["\'](\.(?:/|\\).*\.scss)["\']', content)
    
    if matches:
        new_content = content
        for match in matches:
            # Resolve the absolute path of the scss file
            scss_abs_path = os.path.normpath(os.path.join(os.path.dirname(file_path), match))
            # Get path relative to the root dir for the @import
            rel_path = os.path.relpath(scss_abs_path, root_dir)
            
            with open(all_styles_path, 'a') as f_styles:
                # Use absolute path from root for @import if preferred or relative from pages/
                f_styles.write(f'@import "../{rel_path}";\n')
            
            # Comment out the import in the source file
            # escape dots in match for regex
            match_esc = re.escape(match)
            new_content = re.sub(f'import\s+["\']({match_esc})["\']', r'// import "\1" // Moved to _app', new_content)
        
        with open(file_path, 'w') as f:
            f.write(new_content)
        print(f"Processed {file_path}")
