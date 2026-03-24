window.API_URL = "https://mri-physics-core.onrender.com/calculate";

window.state = {
    slabGroup: '1', slabs: '1', slices: 60, position: '0.0', orientation: 'Transversal', phaseEncDir: 'R >> L',
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

window.config = {
    routine:[
        { section: 'Routine Settings', fields:[
            { id: 'slices', label: 'Slices', val: state.slices, type: 'number', step: 2 },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options:['Transversal', 'Coronal', 'Sagittal'] },
            { id: 'phaseOS', label: 'Phase OS (%)', val: state.phaseOS, type: 'number', step: 10 },
            { id: 'sliceOS', label: 'Slice OS (%)', val: state.sliceOS, type: 'number', step: 5 },
            { id: 'fovRead', label: 'FOV Read (mm)', val: state.fovRead, type: 'number', step: 10 },
            { id: 'fovPhasePct', label: 'FOV Phase (%)', val: state.fovPhasePct, type: 'number', step: 5 },
            { id: 'sliceThick', label: 'Slice Thick (mm)', val: state.sliceThick, type: 'number', step: 0.5 },
            { id: 'tr', label: 'TR (ms)', val: state.tr, type: 'number', step: 100 },
            { id: 'te', label: 'TE (ms)', val: state.te, type: 'number', step: 1 },
            { id: 'nex', label: 'Averages', val: state.nex, type: 'number', step: 0.1 },
            { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number', step: 1 }
        ]}
    ],
    contrast:[
        { section: 'Common', fields:[
            { id: 'tr', label: 'TR (ms)', val: state.tr, type: 'number' },
            { id: 'te', label: 'TE (ms)', val: state.te, type: 'number' },
            { id: 'flipAngle', label: 'Flip Angle', val: state.flipAngle, type: 'number', step: 5 },
            { id: 'saturation', label: 'Saturazione', val: state.saturation, type: 'select', options:['Nessuna', 'Fat Sat', 'Water Sat'] }
        ]}
    ],
    resolution:[
        { section: 'Common', fields:[
            { id: 'baseRes', label: 'Base Resolution', val: state.baseRes, type: 'number', step: 16 },
            { id: 'phaseResPct', label: 'Phase Res (%)', val: state.phaseResPct, type: 'number', step: 1 },
            { id: 'sliceResPct', label: 'Slice Res (%)', val: state.sliceResPct, type: 'number', step: 1 }
        ]}
    ],
    geometry:[
        { section: 'Geometry', fields:[
            { id: 'slices', label: 'Slices per Slab', val: state.slices, type: 'number' },
            { id: 'fovRead', label: 'FOV Read (mm)', val: state.fovRead, type: 'number' },
            { id: 'sliceThick', label: 'Slice Thick (mm)', val: state.sliceThick, type: 'number' },
            { id: 'tr', label: 'TR (ms)', val: state.tr, type: 'number' }
        ]}
    ],
    system:[
        { section: 'Miscellaneous & Tx/Rx', fields:[
            { label: 'B0 Shim', val: 'Standard', type: 'text', readOnly: true },
            { label: 'Frequency 1H (MHz)', val: 123.2, type: 'text', readOnly: true }
        ]}
    ],
    physio:[
        { section: 'Signal', fields:[
            { id: 'tr', label: 'TR (ms)', val: state.tr, type: 'number' }
        ]}
    ],
    sequence:[
        { section: 'Sequence', fields:[
            { id: 'dimension', label: 'Dimension', val: state.dimension, type: 'select', options:['2D', '3D'] },
            { id: 'bw', label: 'Bandwidth (Hz)', val: state.bw, type: 'number', step: 10 },
            { id: 'turboFactor', label: 'Turbo Factor', val: state.turboFactor, type: 'number', step: 1 },
            { id: 'accelType', label: 'Acceleration', val: state.accelType, type: 'select', options:['GRAPPA', 'CAIPIRINHA', 'CS'] },
            { id: 'accelR', label: 'Accel Factor (R)', val: state.accelR, type: 'number', step: 1 },
            { id: 'csFactor', label: 'CS Factor', val: state.csFactor, type: 'range', min: 2, max: 10, step: 0.5 },
            { id: 'gFactor', label: 'Fattore g', val: state.gFactor, type: 'number', step: 0.1 }
        ]}
    ],
    setup:[
        { section: 'Tools', fields:[
            { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'autoIso()' }
        ]}
    ]
};

// ==========================================
// FUNZIONI GLOBALI (ACCESSIBILI DALL'HTML)
// ==========================================

window.checkPassword = function() {
    if (document.getElementById('login-pwd').value === 'simulatore') {
        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('login-screen').style.display = 'none', 500);
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
    
    Object.keys(config).forEach(tabKey => {
        config[tabKey].forEach(section => {
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

window.autoIso = function() {
    const dx = (state.fovRead || 220) / (state.baseRes || 320);
    state.sliceThick = parseFloat(dx.toFixed(2));
    state.phaseResPct = 100;
    state.sliceResPct = 100;
    state.fovPhasePct = 100;
    
    document.querySelectorAll(`[id="inp-sliceThick"]`).forEach(el => el.value = state.sliceThick);
    document.querySelectorAll(`[id="inp-phaseResPct"]`).forEach(el => el.value = 100);
    document.querySelectorAll(`[id="inp-sliceResPct"]`).forEach(el => el.value = 100);
    document.querySelectorAll(`[id="inp-fovPhasePct"]`).forEach(el => el.value = 100);
    
    window.calculatePhysics();
};

window.renderTabContent = function(tabKey) {
    const container = document.getElementById('parameters-container');
    container.innerHTML = '';
    if(!config[tabKey]) return;

    const is2D = state.dimension === '2D';
    const isCS = state.accelType === 'CS';

    config[tabKey].forEach(sec => {
        let html = `<h3 class="text-xs font-bold text-blue-500 mb-3 uppercase border-b border-slate-700 pb-1">${sec.section}</h3><div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">`;
        sec.fields.forEach(f => {
            let val = state[f.id] !== undefined ? state[f.id] : f.val;
            let disabled = (is2D &&['sliceOS', 'sliceResPct', 'slicePartial'].includes(f.id)) || 
                           (isCS && f.id === 'accelR') || 
                           (is2D && f.id === 'accelType' && val === 'CAIPIRINHA') ? 'disabled' : '';
            let opacity = disabled ? 'opacity: 0.3;' : '';
            let display = (f.id === 'csFactor' && !isCS) ? 'display: none;' : '';
            
            let inp = '';
            if (f.type === 'select') {
                inp = `<select id="inp-${f.id}" onchange="updateState('${f.id}', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 text-xs transition-opacity" ${disabled}>
                    ${f.options.map(o => `<option value="${o}" ${val == o ? 'selected' : ''} ${f.id==='accelType'&&o==='CAIPIRINHA'&&is2D?'disabled':''}>${o}</option>`).join('')}</select>`;
            } else if (f.type === 'range') {
                inp = `<div class="flex items-center gap-2"><input type="range" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" class="w-full accent-blue-500" ${disabled}><span id="val-${f.id}" class="text-xs font-mono text-blue-400">${val}x</span></div>`;
            } else if (f.type === 'button') {
                inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500 outline-none">${f.label}</button>`;
            } else {
                inp = `<input type="${f.type}" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs transition-opacity" ${disabled}>`;
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
    
    if (tabKey === 'setup') {
        document.getElementById('patient-panel').classList.remove('hidden');
        document.getElementById('parameters-container').classList.add('hidden');
    } else {
        document.getElementById('patient-panel').classList.add('hidden');
        document.getElementById('parameters-container').classList.remove('hidden');
        window.renderTabContent(tabKey);
    }
};

window.updateState = function(key, value) {
    if (['dimension', 'orientation', 'saturation', 'accelType', 'region'].includes(key)) {
        state[key] = value;
        if(['dimension', 'accelType'].includes(key)) {
            window.calculatePhysics();
            const activeTab = document.querySelector('.tab-btn.active');
            if (activeTab && activeTab.dataset.target !== 'setup') {
                window.renderTabContent(activeTab.dataset.target); 
            }
            return;
        }
    } else {
        state[key] = parseFloat(value) || 0;
    }
    
    document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => { if(el.value != value) el.value = value; });
    if(document.getElementById(`val-${key}`)) document.getElementById(`val-${key}`).innerText = value + (key==='csFactor'?'x':'');
    
    window.calculatePhysics();
    window.applyUIConstraints();
};

window.changeRegion = function(val) {
    state.region = val;
    window.updatePhantomVisibility();
    window.calculatePhysics();
};

window.applyUIConstraints = function() {
    const is2D = state.dimension === '2D';
    const isCS = state.accelType === 'CS';
    
    const accelSelect = document.getElementById('inp-accelType');
    if (accelSelect) {
        for (let i=0; i<accelSelect.options.length; i++) {
            if (accelSelect.options[i].value === 'CAIPIRINHA') {
                accelSelect.options[i].disabled = is2D;
                if (is2D && state.accelType === 'CAIPIRINHA') window.updateState('accelType', 'GRAPPA');
            }
        }
    }

    const zFields =['sliceOS', 'sliceResPct', 'slicePartial'];
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

    let viewId = state.region;
    let legendId = state.region;

    if (state.region === 'abdomen') {
        if (state.orientation === 'Transversal') viewId = 'abdomen-axial';
        else if (state.orientation === 'Coronal') viewId = 'abdomen-coronal';
        else if (state.orientation === 'Sagittal') viewId = 'abdomen-sagittal';
    } else if (state.region === 'pelvis') {
        if (state.orientation === 'Transversal') viewId = 'pelvis-axial';
        else if (state.orientation === 'Coronal') viewId = 'pelvis-coronal';
        else if (state.orientation === 'Sagittal') viewId = 'pelvis-sagittal';
    } else if (state.region === 'thorax') {
        if (state.orientation === 'Transversal') viewId = 'thorax-axial';
        else if (state.orientation === 'Sagittal') viewId = 'thorax-sagittal';
        else viewId = 'thorax-axial'; 
    } else if (state.region === 'head') {
        if (state.orientation === 'Transversal') viewId = 'head-axial';
        else if (state.orientation === 'Sagittal') viewId = 'head-sagittal';
        else viewId = 'head-axial'; 
    }

    const activeGroup = document.getElementById(`ph-group-${viewId}`);
    if(activeGroup) activeGroup.classList.remove('hidden');

    const activeLegend = document.getElementById(`legend-${legendId}`);
    if(activeLegend) activeLegend.classList.remove('hidden');

    const titles = { 
        'abdomen-axial': 'Axial Abdomen', 
        'abdomen-coronal': 'Coronal Abdomen', 
        'abdomen-sagittal': 'Sagittal Abdomen', 
        'pelvis-axial': 'Axial Pelvis / Prostate',
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
// CORE PHYSICS LOGIC & API FETCH
// ==========================================

window.mapSignalToLevel = function(rawSignal, tr, te) {
    let referenceSignal;
    if (te < 50) {
        // Riferimento T1 (Grasso a 3T)
        referenceSignal = 1.0 * (1 - Math.exp(-tr / 250)) * Math.exp(-te / 80);
    } else {
        // Riferimento T2 (Fluido libero a 3T)
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
    if (state.saturation === 'Fat Sat' && isFat) return `rgb(10, 10, 10)`;
    if (state.saturation === 'Water Sat' && !isFat) return `rgb(10, 10, 10)`;

    const effTR = overrideTR !== null ? overrideTR : (state.tr || 1);
    const effTE = overrideTE !== null ? overrideTE : (state.te || 1);

    let rawSignal = 0;
    try {
        const url = `${API_URL}?pd=${pd}&t1=${t1}&t2=${t2}&tr=${effTR}&te=${effTE}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("API fallita");
        const data = await response.json();
        rawSignal = data.Signal;
    } catch (err) {
        // Fallback di sicurezza: Bloch Standard Equation
        rawSignal = pd * (1 - Math.exp(-effTR / t1)) * Math.exp(-effTE / t2);
    }

    return window.mapSignalToLevel(rawSignal, effTR, effTE);
};

window.calculatePhysics = async function() {
    window.updatePhantomVisibility();

    const is3D = state.dimension === '3D';
    const isCS = state.accelType === 'CS';
    const effR = isCS ? 1.0 : (state.accelR || 1);
    const TR = state.tr || 1;
    const TE = state.te || 1;
    const tf = state.turboFactor || 1;

    const N_x = state.baseRes || 1;
    const N_y = Math.round(N_x * ((state.fovPhasePct || 100) / 100) * ((state.phaseResPct || 100) / 100)) || 1;
    let N_z = is3D ? Math.round((state.slices || 1) * ((state.sliceResPct || 100) / 100)) || 1 : 1;

    const dx = (state.fovRead || 220) / N_x;
    let dy = ((state.fovRead || 220) * ((state.fovPhasePct || 100) / 100)) / N_y;
    if (state.fovPhasePct === 100 && state.phaseResPct === 100) dy = dx; 
    let dz = is3D ? ((state.slices || 1) * (state.sliceThick || 1)) / N_z : (state.sliceThick || 1);

    const V_voxel = dx * dy * dz;
    const isIsotropic = (Math.max(dx, dy, dz) - Math.min(dx, dy, dz)) <= 0.01;

    const effNy = N_y * (1 + (state.phaseOS || 0) / 100) * ((state.phasePartial || 100) / 100);
    
    let taSeconds = 0;
    let displayedShots = 0;
    let totalLines = 0;

    if (is3D) {
        const effNz = N_z * (1 + (state.sliceOS || 0) / 100) * ((state.slicePartial || 100) / 100);
        totalLines = effNy * effNz;
        taSeconds = (totalLines * (state.nex || 1) * TR) / (tf * effR * 1000);
        displayedShots = totalLines / (tf * effR);
    } else {
        totalLines = effNy * (state.slices || 1);
        const fettePerTR = Math.max(1, Math.floor(TR / ((state.echoSpacing || 4.4) * tf + 10)));
        taSeconds = (totalLines * (state.nex || 1)) / (tf * effR * fettePerTR) * (TR / 1000);
        displayedShots = totalLines / (tf * effR);
    }
    
    if(isCS) {
        taSeconds = taSeconds / (state.csFactor || 1);
        displayedShots = displayedShots / (state.csFactor || 1);
    }

    const m = Math.floor(taSeconds / 60);
    const s = Math.round(taSeconds % 60);

    const weight = state.patWeight || 75;
    const height = state.patHeight || 175;
    const bmi = weight / Math.pow(height/100, 2);
    const sar = (0.002 * tf * bmi / (TR / 1000)) * Math.pow((state.flipAngle || 135) / 180, 2);

    const bwHzPx = (state.bw || 521) / N_y; 
    const acqTerm = is3D ? ((state.nex || 1) * N_y * N_z) / 14500 : ((state.nex || 1) * N_y) / 14500;
    
    let snrBase = (V_voxel / 0.64) * Math.sqrt(acqTerm) * Math.sqrt(521 / (state.bw || 521)) * Math.exp(-TE / 85) * 3.5; 
    
    let snrFinal = snrBase;
    if (bwHzPx < 100) snrFinal *= 1.15; else if (bwHzPx > 250) snrFinal *= 0.60;

    if (isCS) {
        snrFinal *= Math.sqrt(1.0 / (state.csFactor || 1)) * (Math.sqrt(state.csFactor || 1) * 0.9);
    } else {
        let g_eff = state.accelType === 'CAIPIRINHA' ? Math.max(1.0, (state.gFactor || 1) - 0.3) : (state.gFactor || 1);
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
    if (state.region === 'abdomen') {
        const[c_liver, c_spleen, c_kidney_c, c_kidney_m, c_muscle, c_fat, c_spine, c_fluid] = await Promise.all([
            window.fetchSignalFromJava(810, 42, 0.85, null, null, false),
            window.fetchSignalFromJava(1000, 80, 0.90, null, null, false),
            window.fetchSignalFromJava(1100, 95, 0.90, null, null, false),
            window.fetchSignalFromJava(1100, 130, 0.95, null, null, false),
            window.fetchSignalFromJava(900, 50, 0.80, null, null, false),
            window.fetchSignalFromJava(250, 80, 1.0, null, null, true),
            window.fetchSignalFromJava(300, 60, 0.80, null, null, false),
            window.fetchSignalFromJava(4000, 2000, 1.0, null, null, false)
        ]);

        document.querySelectorAll('[id$="-liver"]').forEach(el => el.setAttribute('fill', c_liver));
        document.querySelectorAll('[id$="-spleen"]').forEach(el => el.setAttribute('fill', c_spleen));
        document.querySelectorAll('[id$="-kidney-r-cortex"]').forEach(el => el.setAttribute('fill', c_kidney_c));
        document.querySelectorAll('[id$="-kidney-l-cortex"]').forEach(el => el.setAttribute('fill', c_kidney_c));
        document.querySelectorAll('[id$="-kidney-r-medulla"]').forEach(el => el.setAttribute('fill', c_kidney_m));
        document.querySelectorAll('[id$="-kidney-l-medulla"]').forEach(el => el.setAttribute('fill', c_kidney_m));
        document.querySelectorAll('[id$="-kidney-cortex"]').forEach(el => el.setAttribute('fill', c_kidney_c));
        document.querySelectorAll('[id$="-kidney-medulla"]').forEach(el => el.setAttribute('fill', c_kidney_m));
        document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
        document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
        document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_spine));
        document.querySelectorAll('[id$="-fluid"]').forEach(el => el.setAttribute('fill', c_fluid));
        document.querySelectorAll('[id$="-csf"]').forEach(el => el.setAttribute('fill', c_fluid));

        if(document.getElementById('leg-abd-liver')) document.getElementById('leg-abd-liver').style.backgroundColor = c_liver;
        if(document.getElementById('leg-abd-spleen')) document.getElementById('leg-abd-spleen').style.backgroundColor = c_spleen;
        if(document.getElementById('leg-abd-kidney')) document.getElementById('leg-abd-kidney').style.backgroundColor = c_kidney_c;
        if(document.getElementById('leg-abd-fat')) document.getElementById('leg-abd-fat').style.backgroundColor = c_fat;
        if(document.getElementById('leg-abd-fluid')) document.getElementById('leg-abd-fluid').style.backgroundColor = c_fluid;
        if(document.getElementById('leg-abd-muscle')) document.getElementById('leg-abd-muscle').style.backgroundColor = c_muscle;
    } 
    else if (state.region === 'pelvis') {
        let t1pz = 1200, t2pz = 130, pdPz = 0.9;
        let t1tz = 1000, t2tz = 80, pdTz = 0.8;
        
        if (state.te >= 100) {
            const edemaFactor = Math.min(2.0, 1.0 + ((state.te - 100) / 100)); 
            t2pz = 180; pdPz = 0.9 * edemaFactor;
            t2tz = 100; pdTz = 0.8 * edemaFactor;
        }

        const[c_pz, c_tz, c_bladder, c_muscle, c_fat, c_bone, c_rectum] = await Promise.all([
            window.fetchSignalFromJava(t1pz, t2pz, pdPz, null, null, false),
            window.fetchSignalFromJava(t1tz, t2tz, pdTz, null, null, false),
            window.fetchSignalFromJava(3000, 1000, 1.0, null, null, false),
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
        document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_bone));
        document.querySelectorAll('[id$="-rectum"]').forEach(el => el.setAttribute('fill', c_rectum));

        if(document.getElementById('leg-pelvis-pz')) document.getElementById('leg-pelvis-pz').style.backgroundColor = c_pz;
        if(document.getElementById('leg-pelvis-tz')) document.getElementById('leg-pelvis-tz').style.backgroundColor = c_tz;
        if(document.getElementById('leg-pelvis-bladder')) document.getElementById('leg-pelvis-bladder').style.backgroundColor = c_bladder;
        if(document.getElementById('leg-pelvis-fat')) document.getElementById('leg-pelvis-fat').style.backgroundColor = c_fat;
        if(document.getElementById('leg-pelvis-muscle')) document.getElementById('leg-pelvis-muscle').style.backgroundColor = c_muscle;
        if(document.getElementById('leg-pelvis-bone')) document.getElementById('leg-pelvis-bone').style.backgroundColor = c_bone;
    }
    else if (state.region === 'thorax') {
        const[c_lung, c_heart, c_blood, c_muscle, c_fat, c_spine] = await Promise.all([
            window.fetchSignalFromJava(1200, 30, 0.2, null, null, false),
            window.fetchSignalFromJava(900, 50, 0.8, null, null, false),
            window.fetchSignalFromJava(1200, 50, 0.9, null, null, false), 
            window.fetchSignalFromJava(900, 50, 0.8, null, null, false),
            window.fetchSignalFromJava(250, 80, 1.0, null, null, true),
            window.fetchSignalFromJava(300, 60, 0.8, null, null, false)
        ]);
        
        document.querySelectorAll('[id*="-lung"]').forEach(el => el.setAttribute('fill', c_lung));
        document.querySelectorAll('[id$="-heart"]').forEach(el => el.setAttribute('fill', c_heart));
        document.querySelectorAll('[id$="-heart-lv"],[id$="-heart-rv"],[id$="-heart-la"], [id$="-heart-ra"]').forEach(el => el.setAttribute('fill', c_heart));
        document.querySelectorAll('[id$="-aorta"]').forEach(el => el.setAttribute('fill', c_blood));
        document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
        document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
        document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_spine));
        document.querySelectorAll('[id$="-sternum"]').forEach(el => el.setAttribute('fill', c_spine));

        if(document.getElementById('leg-tho-lung')) document.getElementById('leg-tho-lung').style.backgroundColor = c_lung;
        if(document.getElementById('leg-tho-heart')) document.getElementById('leg-tho-heart').style.backgroundColor = c_heart;
        if(document.getElementById('leg-tho-blood')) document.getElementById('leg-tho-blood').style.backgroundColor = c_blood;
        if(document.getElementById('leg-tho-fat')) document.getElementById('leg-tho-fat').style.backgroundColor = c_fat;
    }
    else if (state.region === 'head') {
        const isT1 = state.orientation === 'Sagittal';
        const effTR = isT1 ? 500 : state.tr;
        const effTE = isT1 ? 15 : state.te;

        const[c_csf, c_gm, c_wm, c_fat, c_bone] = await Promise.all([
            window.fetchSignalFromJava(4000, 2000, 1.0, effTR, effTE, false),
            window.fetchSignalFromJava(1200, 100, 0.85, effTR, effTE, false),
            window.fetchSignalFromJava(600, 80, 0.75, effTR, effTE, false),
            window.fetchSignalFromJava(250, 80, 1.0, effTR, effTE, true),
            window.fetchSignalFromJava(2000, 10, 0.1, effTR, effTE, false)
        ]);

        document.querySelectorAll('[id*="-csf"]').forEach(el => el.setAttribute('fill', c_csf));
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
    let gFactorOpacity = (state.accelType === 'GRAPPA' || state.accelType === 'CAIPIRINHA') && state.accelR > 2.0 ? (state.accelR - 2.0) * 0.15 * state.gFactor : 0;
    
    if (state.accelType === 'CS') {
        const cleanFactor = state.csFactor * 0.05;
        baseNoiseOpacity = Math.max(0, baseNoiseOpacity - cleanFactor);
        gFactorOpacity = Math.max(0, gFactorOpacity - cleanFactor);
        document.getElementById('phantom-container').style.filter = `grayscale(100%) blur(${(state.csFactor - 1) * 0.3}px) contrast(110%)`;
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

document.addEventListener('DOMContentLoaded', () => { 
    window.switchTab('routine'); 
    window.calculatePhysics(); 
});
