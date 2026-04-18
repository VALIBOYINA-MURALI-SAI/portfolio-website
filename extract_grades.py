import pdfplumber

for i in range(1, 8):
    try:
        with pdfplumber.open(f'public/Education/Degree Grade card_{i}.pdf') as pdf:
            text = ''
            for page in pdf.pages:
                text += page.extract_text()
            print(f'=== Semester {i} ===')
            print(f'Total text length: {len(text)}')
            print('First 500 characters:')
            print(text[:500])
            print()
    except Exception as e:
        print(f'Error reading Semester {i}: {e}')