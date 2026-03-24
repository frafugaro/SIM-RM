try {
    // URL del tuo motore fisico
    window.API_URL = "https://rmsimulator.onrender.com/calculate";

    // 1. STATO GLOBALE 
    window.state = {
        slabGroup: '1.0', slabs: '1.0', slices: 60, position: '0.0', orientation: 'Transversal', phaseEncDir: 'R >> L',
        phaseOS: 30.0, sliceOS: 5.0, fovRead: 220.0, fovPhasePct: 100.0, sliceThick: 1.0, tr: 2200.0, te: 105.0, nex: 1.8, conc: 1,
        autoAlign: 'Head > Brain', coilElements: 'BO2,3;SP4,5',
        flipAngle: 135.0, saturation: 'Standard', darkBlood: false, bloodSuppression: 'Off',
        dynamicMode: 'Standard', measurements: 1.0, multipleSeries: 'Each Measurement', reordering: 'Linear',
        baseRes: 320, phaseResPct: 91.0, sliceResPct: 81.0, interp: '1',
        accelType: 'GRAPPA', accelR: 4.0, refScans: 'GRE/Separate', accelPE: 2.0, refLinesPE: 24, accel3D: 2.0, refLines3D: 24,
        reorderShift3D: 1.0, phasePartial: 100.0, slicePartial: 100.0, gFactor: 1.0, csFactor: 2.0,
        fovReadPhaseText: '220 / 100 %',
        seqName: 'SPACE 3D', dimension: '3D', bw: 521.0, echoSpacing: 4.4, turboFactor: 64, echoTrainDuration: 220.0,
        region: 'abdomen', patWeight: 75, patHeight: 175
    };

    // 2. CONFIGURAZIONE TABS (Syngo Console)
    window.config = {
        routine:[
            { section: 'Routine', fields:[
                { id: 'slabGroup', label: 'Slab Group', val: state.slabGroup, type: 'text', readOnly: true },
                { id: 'slabs', label: 'Slabs', val: state.slabs, type: 'text', readOnly: true },
                { id: 'slices', label: 'Slices per Slab', val: state.slices, type: 'number', step: 2 },
                { id: 'position', label: 'Position', val: state.position, type: 'text' },
                { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options:['Transversal', 'Coronal', 'Sagittal'] },
                { id: 'phaseEncDir', label: 'Phase Encoding Dir.', val: state.phaseEncDir, type: 'select', options:['R >> L', 'A >> P'] },
                { id: 'phaseOS', label: 'Phase Oversampling %', val: state.phaseOS, type: 'number', step: 10 },
                { id: 'sliceOS', label: 'Slice Oversampling %', val: state.sliceOS, type: 'number', step: 5 },
                { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number', step: 10 },
                { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number', step: 5 },
                { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number', step: 0.5 },
                { id: 'tr', label: 'TR ms', val: state.tr, type: 'number', step: 100 },
                { id: 'te', label: 'TEeff ms', val: state.te, type: 'number', step: 1 },
                { id: 'nex', label: 'Averages/NEX', val: state.nex, type: 'number', step: 0.1 },
                { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number', step: 1 },
                { id: 'autoAlign', label: 'AutoAlign', val: state.autoAlign, type: 'text' },
                { id: 'coilElements', label: 'Coil Elements', val: state.coilElements, type: 'text' }
            ]}
        ],
        contrast:[
            { section: 'Common', fields:[
                { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
                { id: 'te', label: 'TEeff ms', val: state.te, type: 'number' },
                { id: 'flipAngle', label: 'Flip Angle deg', val: state.flipAngle, type: 'number' },
                { id: 'saturation', label: 'Fat-Water Contrast', val: state.saturation, type: 'select', options:['Standard', 'Fat Sat', 'Water Sat'] },
                { id: 'darkBlood', label: 'Dark Blood', val: state.darkBlood, type: 'checkbox' },
                { id: 'bloodSuppression', label: 'Blood Suppression', val: state.bloodSuppression, type: 'select', options:['Off', 'On'] }
            ]},
            { section: 'Dynamic', fields:[
                { id: 'dynamicMode', label: 'Dynamic Mode', val: state.dynamicMode, type: 'text' },
                { id: 'measurements', label: 'Measurements', val: state.measurements, type: 'number' },
                { id: 'multipleSeries', label: 'Multiple Series', val: state.multipleSeries, type: 'text' },
                { id: 'reordering', label: 'Reordering', val: state.reordering, type: 'text' }
            ]}
        ],
        resolution:[
            { section: 'Common', fields:[
                { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number' },
                { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number' },
                { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number' },
                { id: 'baseRes', label: 'Base Resolution / Nx', val: state.baseRes, type: 'number' },
                { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number' },
                { id: 'sliceResPct', label: 'Slice Resolution %', val: state.sliceResPct, type: 'number' },
                { id: 'interp', label: 'Interpolation', val: state.interp, type: 'select', options:['0', '1'] }
            ]},
            { section: 'Acceleration', fields:[
                { id: 'accelType', label: 'Acceleration Mode', val: state.accelType, type: 'select', options:['GRAPPA', 'CAIPIRINHA', 'CS'] },
                { id: 'accelR', label: 'Total Factor R', val: state.accelR, type: 'number' },
                { id: 'refScans', label: 'Reference Scans', val: state.refScans, type: 'text' },
                { id: 'accelPE', label: 'Acceleration Factor PE', val: state.accelPE, type: 'number' },
                { id: 'refLinesPE', label: 'Reference Lines PE', val: state.refLinesPE, type: 'number' },
                { id: 'accel3D', label: 'Acceleration Factor 3D', val: state.accel3D, type: 'number' },
                { id: 'refLines3D', label: 'Reference Lines 3D', val: state.refLines3D, type: 'number' },
                { id: 'reorderShift3D', label: 'Reordering Shift 3D', val: state.reorderShift3D, type: 'number' },
                { id: 'phasePartial', label: 'Phase Partial Fourier %', val: state.phasePartial, type: 'number' },
                { id: 'slicePartial', label: 'Slice Partial Fourier %', val: state.slicePartial, type: 'number' },
                { id: 'gFactor', label: 'Fattore g', val: state.gFactor, type: 'number', step: 0.1 },
                { id: 'csFactor', label: 'CS Factor', val: state.csFactor, type: 'range', min: 2, max: 10, step: 0.5 }
            ]}
        ],
        geometry:[
            { section: 'Geometry', fields:[
                { id: 'slabGroup', label: 'Slab Group', val: state.slabGroup, type: 'text' },
                { id: 'slabs', label: 'Slabs', val: state.slabs, type: 'text' },
                { id: 'slices', label: 'Slices per Slab', val: state.slices, type: 'number' },
                { id: 'position', label: 'Position', val: state.position, type: 'text' },
                { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options:['Transversal', 'Coronal', 'Sagittal'] },
                { id: 'phaseEncDir', label: 'Phase Encoding Dir.', val: state.phaseEncDir, type: 'text' },
                { id: 'phaseOS', label: 'Phase Oversampling %', val: state.phaseOS, type: 'number' },
                { id: 'sliceOS', label: 'Slice Oversampling %', val: state.sliceOS, type: 'number' },
                { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number' },
                { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number' },
                { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number' },
                { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
                { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number' }
            ]}
        ],
        system:[
            { section: 'Miscellaneous', fields:[
                { label: 'B0 Shim', val: 'Standard', type: 'text', readOnly: true },
                { label: 'Frequency 1H (MHz)', val: '123.2', type: 'text', readOnly: true }
            ]}
        ],
        physio:[
            { section: 'Signal', fields:[
                { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' }
            ]},
            { section: 'Cardiac', fields:[
                { id: 'fovReadPhaseText', label: 'FOV Read / Phase', val: state.fovReadPhaseText, type: 'text', readOnly: true },
                { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number' }
            ]}
        ],
        sequence:[
            { section: 'Sequence', fields:[
                { id: 'seqName', label: 'Sequence Name', val: state.seqName, type: 'text' },
                { id: 'dimension', label: 'Dimension', val: state.dimension, type: 'select', options:['2D', '3D'] },
                { id: 'bw', label: 'Bandwidth Hz/Px', val: state.bw, type: 'number' },
                { id: 'echoSpacing', label: 'Echo Spacing ms', val: state.echoSpacing, type: 'number', step: 0.1 },
                { id: 'turboFactor', label: 'Turbo Factor/ETL', val: state.turboFactor, type: 'number' },
                { id: 'echoTrainDuration', label: 'Echo Train Duration ms', val: state.echoTrainDuration, type: 'number' }
            ]}
        ],
        setup:[
            { section: 'Paziente', fields:[
                { id: 'region', label: 'Distretto Anatomico', val: state.region, type: 'select', options:['abdomen', 'pelvis', 'thorax', 'head'] },
                { id: 'patWeight', label: 'Peso (kg)', val: state.patWeight, type: 'number' },
                { id: 'patHeight', label: 'Altezza (cm)', val: state.patHeight, type: 'number' }
            ]},
            { section: 'Tools', fields:[
                { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'window.autoIso()' }
            ]}
        ]
    };

    // 3. LOGIN & SEARCH
    window.checkPassword = function() {
        if (document.getElementById('login-pwd').value === 'simulatore') {
            document.getElementById('login-screen').style.opacity = '0';
            setTimeout(() => { 
                document.getElementById('login-screen').style.display = 'none'; 
                window.switchTab('routine'); 
                window.calculatePhysics();
            }, 500);
        } else {
            document.getElementById('login-err').classList.remove('hidden');
        }
    };

    window.searchParameters = function(query) {
        const resContainer = document.getElementById('search-results');
        resContainer.innerHTML = '';
        if (!query || query.trim().length < 2) { resContainer.classList.add('hidden'); return; }
        
        const lowerQuery = query.toLowerCase();
        let hasMatches = false;
        
        Object.keys(window.config).forEach(tabKey => {
            window.config[tabKey].forEach(section => {
                section.fields.forEach(field => {
                    if (field.label.toLowerCase().includes(lowerQuery)) {
                        hasMatches = true;
                        const div = document.createElement('div');
                        div.className = 'px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer border-b border-slate-800';
                        div.innerText = `${field.label} - Tab: ${tabKey.toUpperCase()}`;
                        div.onclick = () => window.MapsToParam(tabKey, field.id);
                        resContainer.appendChild(div);
                    }
                });
            });
        });

        if (hasMatches) {
            resContainer.classList.remove('hidden');
            resContainer.classList.add('flex');
        } else {
            resContainer.classList.add('hidden');
            resContainer.classList.remove('flex');
        }
    };

    window.MapsToParam = function(tabKey, fieldId) {
        document.getElementById('search-results').classList.add('hidden');
        document.getElementById('quick-search').value = '';
        window.switchTab(tabKey);

        if (!fieldId) return; 

        setTimeout(() => {
            const el = document.getElementById(`inp-${fieldId}`);
            if (el) {
                el.focus();
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('ring-2', 'ring-blue-400', 'bg-blue-900/30', 'transition-all', 'duration-500');
                setTimeout(() => el.classList.remove('ring-2', 'ring-blue-400', 'bg-blue-900/30'), 2000);
            }
        }, 50);
    };

    // 4. LOGICA AUTO-ISO & INTERFACCIA (FIX CRASH)
    window.autoIso = function() {
        const dx = (window.state.fovRead || 220) / (window.state.baseRes || 320);
        window.state.sliceThick = parseFloat(dx.toFixed(2));
        window.state.phaseResPct = 100;
        window.state.sliceResPct = 100;
        window.state.fovPhasePct = 100;
        
        document.querySelectorAll(`[id="inp-sliceThick"]`).forEach(el => el.value = window.state.sliceThick);
        document.querySelectorAll(`[id="inp-phaseResPct"]`).forEach(el => el.value = 100);
        document.querySelectorAll(`[id="inp-sliceResPct"]`).forEach(el => el.value = 100);
        document.querySelectorAll(`[id="inp-fovPhasePct"]`).forEach(el => el.value = 100);
        
        window.calculatePhysics();
    };

    window.renderTabContent = function(tabKey) {
        const container = document.getElementById('parameters-container');
        container.innerHTML = '';
        if(!window.config[tabKey]) return;

        const is2D = window.state.dimension === '2D';
        const isCS = window.state.accelType === 'CS';

        window.config[tabKey].forEach(sec => {
            let html = `<h3 class="text-xs font-bold text-blue-500 mb-3 uppercase border-b border-slate-700 pb-1">${sec.section}</h3><div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">`;
            sec.fields.forEach(f => {
                let val = window.state[f.id] !== undefined ? window.state[f.id] : f.val;
                let disabled = (is2D &&['sliceOS', 'sliceResPct', 'slicePartial'].includes(f.id)) || 
                               (isCS && f.id === 'accelR') || 
                               (is2D && f.id === 'accelType' && val === 'CAIPIRINHA') ? 'disabled' : '';
                let opacity = disabled ? 'opacity: 0.3;' : '';
                let display = (f.id === 'csFactor' && !isCS) ? 'display: none;' : '';
                
                let inp = '';
                if (f.type === 'select') {
                    inp = `<select id="inp-${f.id}" onchange="window.updateState('${f.id}', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 text-xs transition-opacity" ${disabled}>
                        ${f.options.map(o => `<option value="${o}" ${val == o ? 'selected' : ''} ${f.id==='accelType'&&o==='CAIPIRINHA'&&is2D?'disabled':''}>${o}</option>`).join('')}</select>`;
                } else if (f.type === 'range') {
                    inp = `<div class="flex items-center gap-2"><input type="range" id="inp-${f.id}" oninput="window.updateState('${f.id}', this.value)" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" class="w-full accent-blue-500" ${disabled}><span id="val-${f.id}" class="text-xs font-mono text-blue-400">${val}x</span></div>`;
                } else if (f.type === 'checkbox') {
                    inp = `<input type="checkbox" id="inp-${f.id}" onchange="window.updateState('${f.id}', this.checked)" ${val ? 'checked' : ''} class="mt-1 w-4 h-4 bg-slate-900 border border-slate-700 rounded focus:ring-blue-500" ${disabled}>`;
                } else if (f.type === 'button') {
                    inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500 outline-none">${f.label}</button>`;
                } else {
                    inp = `<input type="${f.type}" id="inp-${f.id}" oninput="window.updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs transition-opacity" ${disabled} ${f.readOnly ? 'readonly' : ''}>`;
                }

                html += `<div class="flex flex-col gap-1 transition-opacity justify-end" style="${opacity} ${display}">
                    ${f.type !== 'button' ? `<label class="text-[10px] uppercase text-slate-400">${f.label}</label>` : ''}${inp}</div>`;
            });
            container.innerHTML += `<div class="mb-6">${html}</div></div>`;
        });
    };

    window.switchTab = function(tabKey) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'bg-slate-800', 'border-blue-500', 'text-white'));
        const btn = document.querySelector(`[data-target="${tabKey}"]`);
        if(btn) btn.classList.add('active', 'bg-slate-800', 'border-blue-500', 'text-white');
        
        // BUG FIXATO: Rimosso il controllo su "patient-panel" che non esiste in index.html!
        document.getElementById('parameters-container').classList.remove('hidden');
        window.renderTabContent(tabKey);
    };

    window.updateState = function(key, value) {
        if (typeof value === 'boolean') {
            window.state[key] = value;
        } else if (['dimension', 'orientation', 'saturation', 'accelType', 'region', 'position', 'phaseEncDir', 'autoAlign', 'coilElements', 'dynamicMode', 'multipleSeries', 'reordering', 'refScans', 'seqName', 'bloodSuppression', 'interp'].includes(key)) {
            window.state[key] = value;
            // Aggiorna visibilità fantocci se cambia regione o orientamento
            if (key === 'region' || key === 'orientation') {
                window.updatePhantomVisibility();
            }
            if(['dimension', 'accelType'].includes(key)) {
                window.calculatePhysics();
                const activeTab = document.querySelector('.tab-btn.active');
                if (activeTab) window.renderTabContent(activeTab.dataset.target); 
                return;
            }
        } else {
            window.state[key] = parseFloat(value) || 0;
        }
        
        document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => { 
            if(el.type === 'checkbox') el.checked = value;
            else if(el.value != value) el.value = value; 
        });
        if(document.getElementById(`val-${key}`)) document.getElementById(`val-${key}`).innerText = value + (key==='csFactor'?'x':'');
        
        window.calculatePhysics();
        window.applyUIConstraints();
    };

    window.applyUIConstraints = function() {
        const is2D = window.state.dimension === '2D';
        const isCS = window.state.accelType === 'CS';
        
        const accelSelect = document.getElementById('inp-accelType');
        if (accelSelect) {
            for (let i=0; i<accelSelect.options.length; i++) {
                if (accelSelect.options[i].value === 'CAIPIRINHA') {
                    accelSelect.options[i].disabled = is2D;
                    if (is2D && window.state.accelType === 'CAIPIRINHA') window.updateState('accelType', 'GRAPPA');
                }
            }
        }

        const zFields =['sliceOS', 'sliceResPct', 'slicePartial', 'accel3D', 'refLines3D', 'reorderShift3D'];
        zFields.forEach(f => {
            document.querySelectorAll(`[id="inp-${f}"]`).forEach(el => {
                el.disabled = is2D;
                const flexParent = el.closest('.flex-col');
                if(flexParent) flexParent.style.opacity = is2D ? '0.3' : '1';
            });
        });

        const csSlider = document.getElementById('inp-csFactor');
        if(csSlider) {
            const flexParent = csSlider.closest('.flex-col');
            if(flexParent) flexParent.style.display = isCS ? 'flex' : 'none';
        }
        
        document.querySelectorAll(`[id="inp-accelR"]`).forEach(el => {
            el.disabled = isCS;
            const flexParent = el.closest('.flex-col');
            if(flexParent) flexParent.style.opacity = isCS ? '0.3' : '1';
        });
    };

    window.updatePhantomVisibility = function() {
        document.querySelectorAll('g[id^="ph-group-"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('div[id^="legend-"]').forEach(el => el.classList.add('hidden'));

        let viewId = window.state.region;
        let legendId = window.state.region;

        if (window.state.region === 'abdomen') {
            if (window.state.orientation === 'Transversal') viewId = 'abdomen-axial';
            else if (window.state.orientation === 'Coronal') viewId = 'abdomen-coronal';
            else if (window.state.orientation === 'Sagittal') viewId = 'abdomen-sagittal';
        } else if (window.state.region === 'pelvis') {
            if (window.state.orientation === 'Transversal') viewId = 'pelvis-axial';
            else if (window.state.orientation === 'Coronal') viewId = 'pelvis-coronal';
            else if (window.state.orientation === 'Sagittal') viewId = 'pelvis-sagittal';
        } else if (window.state.region === 'thorax') {
            if (window.state.orientation === 'Transversal') viewId = 'thorax-axial';
            else if (window.state.orientation === 'Sagittal') viewId = 'thorax-sagittal';
            else viewId = 'thorax-axial'; 
        } else if (window.state.region === 'head') {
            if (window.state.orientation === 'Transversal') viewId = 'head-axial';
            else if (window.state.orientation === 'Sagittal') viewId = 'head-sagittal';
            else viewId = 'head-axial'; 
        }

        const activeGroup = document.getElementById(`ph-group-${viewId}`);
        if(activeGroup) {
            activeGroup.classList.remove('hidden');
            activeGroup.style.display = 'block'; 
        }

        const activeLegend = document.getElementById(`legend-${legendId}`);
        if(activeLegend) {
            activeLegend.classList.remove('hidden');
            activeLegend.style.display = 'grid'; 
        }

        const titles = { 
            'abdomen-axial': 'Axial Abdomen', 
            'abdomen-coronal': 'Coronal Abdomen', 
            'abdomen-sagittal': 'Sagittal Abdomen', 
            'pelvis-axial': 'Axial Pelvis',
            'pelvis-coronal': 'Coronal Pelvis',
            'pelvis-sagittal': 'Sagittal Pelvis',
            'thorax-axial': 'Axial Thorax', 
            'thorax-sagittal': 'Sagittal Thorax',
            'head-axial': 'Axial Brain',
            'head-sagittal': 'Sagittal Brain'
        };
        document.getElementById('phantom-title').innerText = titles[viewId] || 'Phantom';
    };

    // ==========================================
    // CORE PHYSICS & BLOCH 5-LEVEL SCALING
    // ==========================================

    window.mapSignalToLevel = function(rawSignal, tr, te) {
        let referenceSignal;
        if (te < 50) {
            referenceSignal = 1.0 * (1 - Math.exp(-tr / 250)) * Math.exp(-te / 80);
        } else {
            referenceSignal = 1.0 * (1 - Math.exp(-tr / 4000)) * Math.exp(-te / 2000);
        }

        if (referenceSignal < 0.001) referenceSignal = 0.001;

        let normalized = rawSignal / (referenceSignal * 0.9);
        let s = Math.max(0, Math.min(1.0, normalized));

        const levels =[10, 60, 120, 190, 245];
        let scaled = s * 4.0;
        let lowerIdx = Math.floor(scaled);
        let upperIdx = Math.ceil(scaled);
        
        if (lowerIdx >= 4) return `rgb(245, 245, 245)`;
        
        let t = scaled - lowerIdx;
        let c = Math.round(levels[lowerIdx] * (1 - t) + levels[upperIdx] * t);
        
        return `rgb(${c}, ${c}, ${c})`;
    };

    window.fetchSignalFromJava = async function(t1, t2, pd, overrideTR = null, overrideTE = null, isFat = false) {
        if (window.state.saturation === 'Fat Sat' && isFat) return `rgb(10, 10, 10)`;
        if (window.state.saturation === 'Water Sat' && !isFat) return `rgb(10, 10, 10)`;

        const effTR = overrideTR !== null ? overrideTR : (window.state.tr || 1);
        const effTE = overrideTE !== null ? overrideTE : (window.state.te || 1);

        let rawSignal = 0;
        try {
            // Nota: Se hai cambiato l'URL API in precedenza per Render, l'ho lasciato corretto sopra!
            const url = `${window.API_URL}?pd=${pd}&t1=${t1}&t2=${t2}&tr=${effTR}&te=${effTE}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("API fallita");
            const data = await response.json();
            rawSignal = data.Signal;
        } catch (err) {
            rawSignal = pd * (1 - Math.exp(-effTR / t1)) * Math.exp(-effTE / t2);
        }

        return window.mapSignalToLevel(rawSignal, effTR, effTE);
    };

    window.calculatePhysics = async function() {
        window.updatePhantomVisibility();

        const is3D = window.state.dimension === '3D';
        const isCS = window.state.accelType === 'CS';
        const effR = isCS ? 1.0 : (window.state.accelR || 1);
        const TR = window.state.tr || 1;
        const TE = window.state.te || 1;
        const tf = window.state.turboFactor || 1;
        const nex = window.state.nex || 1;

        const N_x = window.state.baseRes || 1;
        const N_y = Math.round(N_x * ((window.state.fovPhasePct || 100) / 100) * ((window.state.phaseResPct || 100) / 100)) || 1;
        let N_z = is3D ? Math.round((window.state.slices || 1) * ((window.state.sliceResPct || 100) / 100)) || 1 : 1;

        const dx = (window.state.fovRead || 220) / N_x;
        let dy = ((window.state.fovRead || 220) * ((window.state.fovPhasePct || 100) / 100)) / N_y;
        if (window.state.fovPhasePct === 100 && window.state.phaseResPct === 100) dy = dx; 
        let dz = is3D ? ((window.state.slices || 1) * (window.state.sliceThick || 1)) / N_z : (window.state.sliceThick || 1);

        const V_voxel = dx * dy * dz;
        const isIsotropic = (Math.max(dx, dy, dz) - Math.min(dx, dy, dz)) <= 0.01;

        const effNy = N_y * (1 + (window.state.phaseOS || 0) / 100) * ((window.state.phasePartial || 100) / 100);
        
        let taSeconds = 0;
        let displayedShots = 0;
        let totalLines = 0;

        if (is3D) {
            const effNz = N_z * (1 + (window.state.sliceOS || 0) / 100) * ((window.state.slicePartial || 100) / 100);
            totalLines = effNy * effNz;
            taSeconds = (totalLines * nex * TR) / (tf * effR * 1000);
            displayedShots = totalLines / (tf * effR);
        } else {
            totalLines = effNy * (window.state.slices || 1);
            const fettePerTR = Math.max(1, Math.floor(TR / ((window.state.echoSpacing || 4.4) * tf + 10)));
            taSeconds = (totalLines * nex) / (tf * effR * fettePerTR) * (TR / 1000);
            displayedShots = totalLines / (tf * effR);
        }
        
        if(isCS) {
            taSeconds = taSeconds / (window.state.csFactor || 1);
            displayedShots = displayedShots / (window.state.csFactor || 1);
        }

        const m = Math.floor(taSeconds / 60);
        const s = Math.round(taSeconds % 60);

        const weight = window.state.patWeight || 75;
        const height = window.state.patHeight || 175;
        const bmi = weight / Math.pow(height/100, 2);
        const sar = (0.002 * tf * bmi / (TR / 1000)) * Math.pow((window.state.flipAngle || 135) / 180, 2);

        const bwHzPx = (window.state.bw || 521) / N_y; 
        const acqTerm = is3D ? (nex * N_y * N_z) / 14500 : (nex * N_y) / 14500;
        
        let snrBase = (V_voxel / 0.64) * Math.sqrt(acqTerm) * Math.sqrt(521 / (window.state.bw || 521)) * Math.exp(-TE / 85) * 3.5; 
        
        let snrFinal = snrBase;
        if (bwHzPx < 100) snrFinal *= 1.15; else if (bwHzPx > 250) snrFinal *= 0.60;

        if (isCS) {
            snrFinal *= Math.sqrt(1.0 / (window.state.csFactor || 1)) * (Math.sqrt(window.state.csFactor || 1) * 0.9);
        } else {
            let g_eff = window.state.accelType === 'CAIPIRINHA' ? Math.max(1.0, (window.state.gFactor || 1) - 0.3) : (window.state.gFactor || 1);
            snrFinal *= (1 / (g_eff * Math.sqrt(effR)));
        }

        document.getElementById('out-ta').innerText = `${m}:${s.toString().padStart(2, '0')}`;
        document.getElementById('out-etl').innerText = `${tf} / ${Math.ceil(displayedShots)}`;
        document.getElementById('out-res').innerText = `${dx.toFixed(2)} × ${dy.toFixed(2)} × ${dz.toFixed(2)} mm`;
        document.getElementById('out-bw-real').innerText = `BW: ${bwHzPx.toFixed(1)} Hz/Px`;
        document.getElementById('out-snr-base').innerText = snrBase.toFixed(2);
        document.getElementById('out-snr-final').innerText = snrFinal.toFixed(2);
        
        const sarEl = document.getElementById('out-sar');
        sarEl.innerText = sar.toFixed(2);
        sarEl.className = `font-mono text-sm border-b ${sar > 3.2 ? 'text-red-400 font-bold border-red-500 animate-pulse' : 'text-slate-200 border-transparent'}`;

        const isoEl = document.getElementById('out-iso');
        isoEl.innerText = isIsotropic ? 'ISO ✅' : 'ANISO';
        isoEl.className = `font-bold text-[10px] ${isIsotropic ? 'text-green-500' : 'text-yellow-600'}`;

        await window.renderSVGPhantom(snrFinal, bwHzPx);
    };

    window.renderSVGPhantom = async function(snrFinal, bwHzPx) {
        if (window.state.region === 'abdomen') {
            const[c_liver, c_spleen, c_kidney, c_fluid, c_muscle, c_fat, c_spine] = await Promise.all([
                window.fetchSignalFromJava(810, 42, 0.85, null, null, false),
                window.fetchSignalFromJava(1000, 80, 0.90, null, null, false),
                window.fetchSignalFromJava(1100, 95, 0.90, null, null, false),
                window.fetchSignalFromJava(4000, 2000, 1.0, null, null, false),
                window.fetchSignalFromJava(900, 50, 0.80, null, null, false), 
                window.fetchSignalFromJava(250, 80, 1.0, null, null, true),
                window.fetchSignalFromJava(300, 60, 0.80, null, null, false)
            ]);

            document.querySelectorAll('[id$="-liver"]').forEach(el => el.setAttribute('fill', c_liver));
            document.querySelectorAll('[id$="-spleen"]').forEach(el => el.setAttribute('fill', c_spleen));
            document.querySelectorAll('[id*="-kidney"]').forEach(el => el.setAttribute('fill', c_kidney));
            document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
            document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
            document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_spine));
            document.querySelectorAll('[id$="-fluid"]').forEach(el => el.setAttribute('fill', c_fluid));
            document.querySelectorAll('[id$="-csf"]').forEach(el => el.setAttribute('fill', c_fluid));

            if(document.getElementById('leg-abd-liver')) document.getElementById('leg-abd-liver').style.backgroundColor = c_liver;
            if(document.getElementById('leg-abd-spleen')) document.getElementById('leg-abd-spleen').style.backgroundColor = c_spleen;
            if(document.getElementById('leg-abd-kidney')) document.getElementById('leg-abd-kidney').style.backgroundColor = c_kidney;
            if(document.getElementById('leg-abd-fat')) document.getElementById('leg-abd-fat').style.backgroundColor = c_fat;
            if(document.getElementById('leg-abd-fluid')) document.getElementById('leg-abd-fluid').style.backgroundColor = c_fluid;
            if(document.getElementById('leg-abd-muscle')) document.getElementById('leg-abd-muscle').style.backgroundColor = c_muscle;
        } 
        else if (window.state.region === 'pelvis') {
            const[c_pz, c_tz, c_bladder, c_muscle, c_fat, c_bone, c_rectum] = await Promise.all([
                window.fetchSignalFromJava(1200, 130, 0.9, null, null, false),
                window.fetchSignalFromJava(1000, 50, 0.8, null, null, false),
                window.fetchSignalFromJava(4000, 2000, 1.0, null, null, false),
                window.fetchSignalFromJava(900, 50, 0.8, null, null, false),
                window.fetchSignalFromJava(250, 80, 1.0, null, null, true),
                window.fetchSignalFromJava(2000, 10, 0.1, null, null, false),
                window.fetchSignalFromJava(800, 50, 0.5, null, null, false)
            ]);

            document.querySelectorAll('[id$="-prostate-pz"]').forEach(el => el.setAttribute('fill', c_pz));
            document.querySelectorAll('[id$="-prostate-tz"]').forEach(el => el.setAttribute('fill', c_tz));
            document.querySelectorAll('[id$="-bladder"]').forEach(el => el.setAttribute('fill', c_bladder));
            document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
            document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
            document.querySelectorAll('[id*="-bone"]').forEach(el => el.setAttribute('fill', c_bone));
            document.querySelectorAll('[id$="-femur-l"], [id$="-femur-r"]').forEach(el => el.setAttribute('fill', c_bone));
            document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_bone));
            document.querySelectorAll('[id$="-rectum"]').forEach(el => el.setAttribute('fill', c_rectum));

            if(document.getElementById('leg-pelvis-pz')) document.getElementById('leg-pelvis-pz').style.backgroundColor = c_pz;
            if(document.getElementById('leg-pelvis-tz')) document.getElementById('leg-pelvis-tz').style.backgroundColor = c_tz;
            if(document.getElementById('leg-pelvis-bladder')) document.getElementById('leg-pelvis-bladder').style.backgroundColor = c_bladder;
            if(document.getElementById('leg-pelvis-fat')) document.getElementById('leg-pelvis-fat').style.backgroundColor = c_fat;
            if(document.getElementById('leg-pelvis-muscle')) document.getElementById('leg-pelvis-muscle').style.backgroundColor = c_muscle;
            if(document.getElementById('leg-pelvis-bone')) document.getElementById('leg-pelvis-bone').style.backgroundColor = c_bone;
        }
        else if (window.state.region === 'thorax') {
            const[c_lung, c_heart, c_blood, c_muscle, c_fat, c_spine] = await Promise.all([
                window.fetchSignalFromJava(2000, 20, 0.1, null, null, false),
                window.fetchSignalFromJava(900, 50, 0.8, null, null, false),
                window.fetchSignalFromJava(2000, 10, 0.1, null, null, false),
                window.fetchSignalFromJava(900, 50, 0.8, null, null, false),
                window.fetchSignalFromJava(250, 80, 1.0, null, null, true),
                window.fetchSignalFromJava(300, 60, 0.8, null, null, false)
            ]);
            
            document.querySelectorAll('[id*="-lung"]').forEach(el => el.setAttribute('fill', c_lung));
            document.querySelectorAll('[id$="-heart"], [id$="-heart-lv"],[id$="-heart-rv"], [id$="-heart-la"], [id$="-heart-ra"]').forEach(el => el.setAttribute('fill', c_heart));
            document.querySelectorAll('[id$="-aorta"]').forEach(el => el.setAttribute('fill', c_blood));
            document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
            document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
            document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_spine));
            document.querySelectorAll('[id$="-sternum"]').forEach(el => el.setAttribute('fill', c_spine));

            if(document.getElementById('leg-tho-lung')) document.getElementById('leg-tho-lung').style.backgroundColor = c_lung;
            if(document.getElementById('leg-tho-heart')) document.getElementById('leg-tho-heart').style.backgroundColor = c_heart;
            if(document.getElementById('leg-tho-fat')) document.getElementById('leg-tho-fat').style.backgroundColor = c_fat;
        }
        else if (window.state.region === 'head') {
            const isT1 = window.state.orientation === 'Sagittal';
            const effTR = isT1 ? 500 : window.state.tr;
            const effTE = isT1 ? 15 : window.state.te;

            const[c_csf, c_gm, c_wm, c_fat, c_bone] = await Promise.all([
                window.fetchSignalFromJava(4000, 2000, 1.0, effTR, effTE, false),
                window.fetchSignalFromJava(1200, 100, 0.85, effTR, effTE, false),
                window.fetchSignalFromJava(600, 80, 0.75, effTR, effTE, false),
                window.fetchSignalFromJava(250, 80, 1.0, effTR, effTE, true),
                window.fetchSignalFromJava(2000, 10, 0.1, effTR, effTE, false)
            ]);

            document.querySelectorAll('[id*="-csf-outer"], [id*="-csf"]').forEach(el => el.setAttribute('fill', c_csf));
            document.querySelectorAll('[id*="-ventricles"]').forEach(el => el.setAttribute('fill', c_csf));
            document.querySelectorAll('[id*="-ventricle"]').forEach(el => el.setAttribute('fill', c_csf));
            document.querySelectorAll('[id*="-gm"]').forEach(el => el.setAttribute('fill', c_gm));
            document.querySelectorAll('[id*="-wm"]').forEach(el => el.setAttribute('fill', c_wm));
            document.querySelectorAll('[id*="-cc"]').forEach(el => el.setAttribute('fill', c_wm));
            document.querySelectorAll('[id*="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
            document.querySelectorAll('[id*="-bone"]').forEach(el => el.setAttribute('fill', c_bone));

            if(document.getElementById('leg-hd-csf')) document.getElementById('leg-hd-csf').style.backgroundColor = c_csf;
            if(document.getElementById('leg-hd-gm')) document.getElementById('leg-hd-gm').style.backgroundColor = c_gm;
            if(document.getElementById('leg-hd-wm')) document.getElementById('leg-hd-wm').style.backgroundColor = c_wm;
            if(document.getElementById('leg-hd-bone')) document.getElementById('leg-hd-bone').style.backgroundColor = c_bone;
        }

        let baseNoiseOpacity = Math.max(0, (1.0 - snrFinal) * 0.3);
        let gFactorOpacity = (window.state.accelType === 'GRAPPA' || window.state.accelType === 'CAIPIRINHA') && window.state.accelR > 2.0 ? (window.state.accelR - 2.0) * 0.15 * window.state.gFactor : 0;
        
        if (window.state.accelType === 'CS') {
            const cleanFactor = window.state.csFactor * 0.05;
            baseNoiseOpacity = Math.max(0, baseNoiseOpacity - cleanFactor);
            gFactorOpacity = Math.max(0, gFactorOpacity - cleanFactor);
            document.getElementById('phantom-container').style.filter = `grayscale(100%) blur(${(window.state.csFactor - 1) * 0.3}px) contrast(110%)`;
        } else {
            document.getElementById('phantom-container').style.filter = 'grayscale(100%)';
        }

        document.getElementById('ph-noise').setAttribute('opacity', baseNoiseOpacity);
        document.getElementById('ph-noise-gfactor').setAttribute('opacity', gFactorOpacity);

        const shiftPx = bwHzPx < 100 ? 3 : (bwHzPx <= 250 ? 1 : 0);
        document.querySelectorAll('.transform-water').forEach(el => {
            el.style.transform = `translateX(${shiftPx}px)`;
            el.style.filter = shiftPx > 0 ? `drop-shadow(-${shiftPx}px 0px 0px rgba(0,0,0,1))` : '';
        });
    };

    // 5. EVENT LISTENERS E LOGIN DA TASTIERA
    document.addEventListener('DOMContentLoaded', () => { 
        const loginBtn = document.getElementById('login-btn');
        const loginPwd = document.getElementById('login-pwd');
        
        if (loginBtn) loginBtn.addEventListener('click', window.checkPassword);
        
        // Permette di premere "Invio" per accedere
        if (loginPwd) {
            loginPwd.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') window.checkPassword();
            });
        }
    });

} catch(e) {
    console.error("Errore Critico Inizializzazione:", e);
}
