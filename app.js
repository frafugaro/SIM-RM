// --- STATE ---
const state = {
    // Routine
    slabGroup: '1.0', slabs: 1, slices: 30, position: '0.0', orientation: 'Transversal', phaseEncDir: 'R >> L',
    phaseOS: 0.0, sliceOS: 0.0, fovRead: 220.0, fovPhasePct: 100.0, sliceThick: 3.0, tr: 4000.0, te: 100.0, nex: 1.0, conc: 1,
    autoAlign: 'Head > Brain', coilElements: 'Body, Spine',
    // Contrast
    flipAngle: 90.0, saturation: 'Standard', darkBlood: false, bloodSuppression: 'Off',
    dynamicMode: 'Standard', measurements: 1.0, multipleSeries: 'Off', reordering: 'Linear',
    // Resolution
    baseRes: 320, phaseResPct: 100.0, sliceResPct: 100.0, interp: '0',
    // Acceleration
    accelType: 'GRAPPA', accelR: 2.0, refScans: 'GRE', accelPE: 2.0, refLinesPE: 24, accel3D: 1.0, refLines3D: 24,
    reorderShift3D: 1.0, phasePartial: 100.0, slicePartial: 100.0, gFactor: 1.2, csFactor: 2.0,
    // Sequence
    seqName: 'TSE', dimension: '2D', bw: 250.0, echoSpacing: 8.0, turboFactor: 15, echoTrainDuration: 120.0,
    // Setup
    region: 'abdomen', patWeight: 75, patHeight: 175
};

// --- CONFIG TABS ---
const config = {
    routine: [
        { section: 'Routine', fields:[
            { id: 'slabs', label: 'Slabs (3D only)', val: state.slabs, type: 'number', step: 1 },
            { id: 'slices', label: 'Slices per Slab', val: state.slices, type: 'number', step: 1 },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options: ['Transversal', 'Coronal', 'Sagittal'] },
            { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number', step: 10 },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number', step: 5 },
            { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number', step: 0.5 },
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number', step: 100 },
            { id: 'te', label: 'TE ms', val: state.te, type: 'number', step: 5 },
            { id: 'nex', label: 'Averages/NEX', val: state.nex, type: 'number', step: 1 },
            { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number', step: 1 }
        ]}
    ],
    contrast:[
        { section: 'Contrast', fields:[
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
            { id: 'te', label: 'TE ms', val: state.te, type: 'number' },
            { id: 'flipAngle', label: 'Flip Angle deg', val: state.flipAngle, type: 'number' },
            { id: 'saturation', label: 'Fat Saturation', val: state.saturation, type: 'select', options:['Standard', 'Fat Sat'] }
        ]}
    ],
    resolution: [
        { section: 'Resolution', fields:[
            { id: 'baseRes', label: 'Base Resolution', val: state.baseRes, type: 'number' },
            { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number' },
            { id: 'sliceResPct', label: 'Slice Resolution % (3D)', val: state.sliceResPct, type: 'number' }
        ]},
        { section: 'Acceleration', fields:[
            { id: 'accelType', label: 'Mode', val: state.accelType, type: 'select', options: ['Off', 'GRAPPA', 'CS'] },
            { id: 'accelR', label: 'Acceleration Factor', val: state.accelR, type: 'number', step: 1 }
        ]}
    ],
    geometry:[
        { section: 'Geometry', fields:[
            { id: 'phaseOS', label: 'Phase Oversampling %', val: state.phaseOS, type: 'number', step: 10 },
            { id: 'sliceOS', label: 'Slice Oversampling %', val: state.sliceOS, type: 'number', step: 10 }
        ]}
    ],
    system: [
        { section: 'System', fields:[
            { label: 'B0 Field', val: '3.0 Tesla', type: 'text', readOnly: true },
            { id: 'coilElements', label: 'Coil', val: state.coilElements, type: 'text' }
        ]}
    ],
    physio:[
        { section: 'Physio', fields:[
            { id: 'darkBlood', label: 'Dark Blood', val: state.darkBlood, type: 'checkbox' }
        ]}
    ],
    sequence:[
        { section: 'Sequence', fields:[
            { id: 'dimension', label: 'Dimension', val: state.dimension, type: 'select', options: ['2D', '3D'] },
            { id: 'turboFactor', label: 'Turbo Factor (ETL)', val: state.turboFactor, type: 'number', step: 1 },
            { id: 'bw', label: 'Bandwidth Hz/Px', val: state.bw, type: 'number', step: 10 }
        ]}
    ],
    setup:[
        { section: 'Patient Setup', fields:[
            { id: 'region', label: 'Anatomical Region', val: state.region, type: 'select', options: ['abdomen', 'pelvis', 'thorax', 'head'] },
            { id: 'patWeight', label: 'Weight (kg)', val: state.patWeight, type: 'number' },
            { id: 'patHeight', label: 'Height (cm)', val: state.patHeight, type: 'number' },
            { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'autoIso()' }
        ]}
    ]
};

// --- LOGIN ---
document.getElementById('login-btn').addEventListener('click', checkPassword);
document.getElementById('login-pwd').addEventListener('keydown', (e) => { if (e.key === 'Enter') checkPassword(); });

function checkPassword() {
    if (document.getElementById('login-pwd').value === 'simulatore') {
        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('login-screen').style.display = 'none', 500);
    } else {
        document.getElementById('login-err').classList.remove('hidden');
    }
}

// --- TAB RENDERING ---
function renderTabContent(tabKey) {
    const container = document.getElementById('parameters-container');
    container.innerHTML = '';
    if (!config[tabKey]) return;

    config[tabKey].forEach(sec => {
        let html = `<h3 class="text-xs font-bold text-blue-500 mb-3 uppercase border-b border-slate-700 pb-1">${sec.section}</h3><div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">`;
        sec.fields.forEach(f => {
            let val = state[f.id] !== undefined ? state[f.id] : f.val;
            let inp = '';
            
            if (f.type === 'select') {
                inp = `<select id="inp-${f.id}" onchange="updateState('${f.id}', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 text-xs text-slate-200">
                    ${f.options.map(o => `<option value="${o}" ${val == o ? 'selected' : ''}>${o}</option>`).join('')}</select>`;
            } else if (f.type === 'checkbox') {
                inp = `<input type="checkbox" id="inp-${f.id}" onchange="updateState('${f.id}', this.checked)" ${val ? 'checked' : ''} class="mt-1 w-4 h-4 accent-blue-500 bg-slate-900 border border-slate-700 rounded">`;
            } else if (f.type === 'button') {
                inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500 outline-none transition-colors">${f.label}</button>`;
            } else {
                inp = `<input type="${f.type}" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} ${f.readOnly ? 'readonly' : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs text-slate-200 ${f.readOnly ? 'text-slate-500' : ''}">`;
            }

            html += `<div class="flex flex-col gap-1 justify-end">
                ${f.type !== 'button' ? `<label class="text-[10px] uppercase text-slate-400">${f.label}</label>` : ''}${inp}</div>`;
        });
        container.innerHTML += `<div class="mb-6">${html}</div></div>`;
    });
    
    applyUIConstraints();
}

function switchTab(tabKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'bg-slate-800', 'border-blue-500', 'text-white'));
    const btn = document.querySelector(`[data-target="${tabKey}"]`);
    if(btn) btn.classList.add('active', 'bg-slate-800', 'border-blue-500', 'text-white');
    renderTabContent(tabKey);
}

// --- UPDATE STATE (Fix Focus Bug) ---
function updateState(key, value) {
    if (typeof value === 'boolean') {
        state[key] = value;
    } else if (['dimension', 'orientation', 'saturation', 'accelType', 'region'].includes(key)) {
        state[key] = value;
    } else {
        state[key] = parseFloat(value) || 0;
    }
    
    // Update DOM strictly by ID to keep focus
    document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => {
        if(el.type === 'checkbox') el.checked = value;
        else if (el.value != value) el.value = value;
    });
    
    calculatePhysics();
    applyUIConstraints(); 
}

function autoIso() {
    const dx = state.fovRead / state.baseRes;
    updateState('sliceThick', parseFloat(dx.toFixed(2)));
    updateState('phaseResPct', 100);
    updateState('sliceResPct', 100);
    updateState('fovPhasePct', 100);
}

function applyUIConstraints() {
    const is2D = state.dimension === '2D';
    document.querySelectorAll('[id="inp-slabs"],[id="inp-sliceResPct"]').forEach(el => {
        el.disabled = is2D;
        if(el.closest('.flex-col')) el.closest('.flex-col').style.opacity = is2D ? '0.3' : '1';
    });
}

// --- PHYSICS ENGINE ---
const TISSUE_DB = {
    // 3 Tesla values (T1 ms, T2 ms, PD relative to water=1.0)
    fluid: { t1: 4000, t2: 2000, pd: 1.0 },       // LCR, Urine, Bile (Level 4 in T2, 0/1 in T1)
    fat: { t1: 300, t2: 80, pd: 1.0 },            // Subcutaneous Fat (Level 3/4 in T2, 4 in T1)
    liver: { t1: 800, t2: 40, pd: 0.85 },         // Liver (Level 1 in T2, 3 in T1)
    spleen: { t1: 1100, t2: 100, pd: 0.85 },      // Spleen (Level 2/3 in T2, 2 in T1)
    kidney_c: { t1: 1000, t2: 70, pd: 0.85 },     // Cortex (Level 3 in T2, 1/2 in T1)
    kidney_m: { t1: 1200, t2: 90, pd: 0.85 },     // Medulla
    muscle: { t1: 900, t2: 45, pd: 0.8 },         // Muscle
    bone: { t1: 2000, t2: 10, pd: 0.1 },          // Cortical Bone (Level 0)
    marrow: { t1: 400, t2: 80, pd: 0.9 },         // Bone Marrow (Fatty)
    pz: { t1: 1200, t2: 130, pd: 0.85 },          // Prostate PZ (Level 3 in T2)
    tz: { t1: 1000, t2: 80, pd: 0.8 },            // Prostate TZ (Level 1/2 in T2)
    lung: { t1: 1200, t2: 30, pd: 0.2 },          // Lung (Signal void mostly)
    heart: { t1: 900, t2: 50, pd: 0.8 },          // Myocardium
    blood: { t1: 1500, t2: 250, pd: 1.0 },        // Blood (Dynamic flow void applied later)
    wm: { t1: 800, t2: 80, pd: 0.7 },             // White Matter (Level 1 in T2, 3 in T1)
    gm: { t1: 1300, t2: 110, pd: 0.85 }           // Gray Matter (Level 2 in T2, 2 in T1)
};

// Equazione di Bloch approssimata per Spin Echo / Fast Spin Echo
function calculateBlochSignal(tissueKey, tr, te) {
    const t = TISSUE_DB[tissueKey];
    if(!t) return 0;
    
    let pd = t.pd;
    // Simulazione Fat Saturation
    if (state.saturation === 'Fat Sat' && (tissueKey === 'fat' || tissueKey === 'marrow')) {
        pd *= 0.1; 
    }
    // Simulazione Flow Void (Dark Blood) in TSE
    if (tissueKey === 'blood' && !state.darkBlood) {
        pd *= 0.2; // Spoil naturale del flusso in TSE senza compensazione
    }

    // Equazione: S = PD * (1 - exp(-TR/T1)) * exp(-TE/T2)
    const t1Recovery = 1.0 - Math.exp(-tr / t.t1);
    const t2Decay = Math.exp(-te / t.t2);
    
    let signal = pd * t1Recovery * t2Decay;
    
    // Normalizzazione per scalare visivamente su RGB (0-255) mappato su Scala 0-4
    // Il liquido puro in T2 (TR=4000, TE=100) da signal ~ 0.95 -> Bianco
    const maxReferenceSignal = 0.95; 
    let normalized = Math.min(1.0, signal / maxReferenceSignal);
    
    const gray = Math.round(normalized * 255);
    return `rgb(${gray}, ${gray}, ${gray})`;
}

function calculatePhysics() {
    const is3D = state.dimension === '3D';
    const accelR = state.accelType === 'Off' ? 1 : state.accelR;
    
    // Risoluzione
    const N_x = state.baseRes;
    const N_y = Math.round(state.baseRes * (state.fovPhasePct / 100) * (state.phaseResPct / 100));
    const N_z = is3D ? Math.round(state.slices * (state.sliceResPct / 100)) : 1;

    const dx = state.fovRead / N_x;
    let dy = (state.fovRead * (state.fovPhasePct / 100)) / N_y;
    if (state.fovPhasePct === 100 && state.phaseResPct === 100) dy = dx; 
    const dz = state.sliceThick;

    // Tempo di Acquisizione
    let totalLines = N_y;
    if (is3D) totalLines *= N_z * state.slabs;
    else totalLines *= state.slices;
    
    const shots = totalLines / (state.turboFactor * accelR);
    let taSeconds = 0;
    
    if (is3D) {
        taSeconds = shots * state.tr * state.nex / 1000;
    } else {
        const slicesPerTR = Math.max(1, Math.floor(state.tr / (state.echoSpacing * state.turboFactor + 10)));
        taSeconds = (shots / slicesPerTR) * state.tr * state.nex / 1000;
    }

    // SAR Base (approssimazione Vida 3T)
    const bmi = state.patWeight / Math.pow(state.patHeight / 100, 2);
    let sar = (0.002 * state.turboFactor * bmi / (state.tr / 1000)) * Math.pow(state.flipAngle / 90, 2);
    if(is3D) sar *= state.slabs;

    // SNR
    const voxelVol = dx * dy * dz;
    const isIso = Math.abs(dx - dy) < 0.1 && Math.abs(dx - dz) < 0.1;
    let snr = voxelVol * Math.sqrt(state.nex) * Math.sqrt(1 / state.bw);
    if (accelR > 1) snr /= Math.sqrt(accelR);

    // Update UI
    document.getElementById('out-ta').innerText = `${Math.floor(taSeconds / 60)}:${Math.round(taSeconds % 60).toString().padStart(2, '0')}`;
    let totalSlices = is3D ? state.slabs * state.slices : state.slices;
    document.getElementById('out-etl').innerText = `${totalSlices} sl / ${state.turboFactor} etl`;
    document.getElementById('out-res').innerText = `${dx.toFixed(1)}×${dy.toFixed(1)}×${dz.toFixed(1)} mm`;
    document.getElementById('out-snr-final').innerText = snr.toFixed(2);
    
    const sarEl = document.getElementById('out-sar');
    const banner = document.getElementById('alert-banner');
    sarEl.innerText = sar.toFixed(2);
    if (sar > 3.2) {
        sarEl.className = 'font-mono text-sm text-red-400 font-bold border-b border-red-500 animate-pulse';
        banner.classList.remove('hidden');
    } else {
        sarEl.className = 'font-mono text-sm text-slate-200 border-b border-transparent';
        banner.classList.add('hidden');
    }

    const isoEl = document.getElementById('out-iso');
    isoEl.innerText = isIso ? 'ISO ✅' : 'ANISO';
    isoEl.className = `font-bold text-[10px] ${isIso ? 'text-green-500' : 'text-yellow-600'}`;

    renderSVGPhantom();
}

function renderSVGPhantom() {
    // Nascondi tutti i gruppi e legende
    document.querySelectorAll('g[id^="group-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('div[id^="legend-"]').forEach(el => el.classList.add('hidden'));

    // Mostra gruppo attivo basato su Region e Orientation
    const targetGroupId = `group-${state.region}-${state.orientation}`;
    const activeGroup = document.getElementById(targetGroupId);
    if(activeGroup) activeGroup.classList.remove('hidden');

    const activeLegend = document.getElementById(`legend-${state.region}`);
    if(activeLegend) activeLegend.classList.remove('hidden');

    document.getElementById('phantom-title').innerText = `${state.region} ${state.orientation}`;

    // Applica Colori Bloch ai path attivi (Ottimizzato)
    const applyColor = (prefix, suffix, tissueKey) => {
        const el = document.getElementById(`${prefix}-${suffix}`);
        if(el) {
            const color = calculateBlochSignal(tissueKey, state.tr, state.te);
            el.setAttribute('fill', color);
            // Aggiorna anche quadratino legenda se esiste
            const leg = document.getElementById(`leg-${prefix.split('-')[0]}-${suffix}`);
            if(leg) leg.style.backgroundColor = color;
        }
    };

    if (state.region === 'abdomen') {
        let pf = state.orientation === 'Transversal' ? 'abd-ax' : (state.orientation === 'Coronal' ? 'abd-cor' : 'abd-sag');
        applyColor(pf, 'fat', 'fat');
        applyColor(pf, 'muscle', 'muscle');
        applyColor(pf, 'liver', 'liver');
        applyColor(pf, 'spleen', 'spleen');
        applyColor(pf, 'rk-cortex', 'kidney_c');
        applyColor(pf, 'rk-medulla', 'kidney_m');
        applyColor(pf, 'lk-cortex', 'kidney_c');
        applyColor(pf, 'lk-medulla', 'kidney_m');
        applyColor(pf, 'spine', 'marrow');
        applyColor(pf, 'aorta', 'blood');
        applyColor(pf, 'fluid', 'fluid'); // Usa suffisso fluid per la legenda (Bile)
        
        // Colora manuale per la legenda per compatibilità
        const legC = calculateBlochSignal('kidney_c', state.tr, state.te);
        if(document.getElementById('leg-abd-kidney')) document.getElementById('leg-abd-kidney').style.backgroundColor = legC;
    } 
    else if (state.region === 'pelvis') {
        let pf = state.orientation === 'Transversal' ? 'pel-ax' : (state.orientation === 'Coronal' ? 'pel-cor' : 'pel-sag');
        applyColor(pf, 'fat', 'fat');
        applyColor(pf, 'muscle', 'muscle');
        applyColor(pf, 'bladder', 'fluid');
        applyColor(pf, 'pz', 'pz');
        applyColor(pf, 'tz', 'tz');
        applyColor(pf, 'rectum', 'muscle');
        applyColor(pf, 'spine', 'marrow');
        applyColor(pf, 'bone-cortex', 'bone');
        applyColor(pf, 'femur-l', 'marrow');
        applyColor(pf, 'femur-r', 'marrow');
        applyColor(pf, 'penis', 'muscle');
    }
    else if (state.region === 'head') {
        let pf = state.orientation === 'Transversal' ? 'head-ax' : (state.orientation === 'Coronal' ? 'head-cor' : 'head-sag');
        applyColor(pf, 'fat', 'fat');
        applyColor(pf, 'bone', 'bone');
        applyColor(pf, 'csf', 'fluid');
        applyColor(pf, 'ventricles', 'fluid');
        applyColor(pf, 'gm', 'gm');
        applyColor(pf, 'wm', 'wm');
    }
    else if (state.region === 'thorax') {
        let pf = state.orientation === 'Transversal' ? 'tho-ax' : (state.orientation === 'Coronal' ? 'tho-cor' : 'tho-sag');
        applyColor(pf, 'fat', 'fat');
        applyColor(pf, 'muscle', 'muscle');
        applyColor(pf, 'lung-l', 'lung');
        applyColor(pf, 'lung-r', 'lung');
        applyColor(pf, 'heart', 'heart');
        applyColor(pf, 'blood', 'blood');
        applyColor(pf, 'aorta', 'blood');
        applyColor(pf, 'spine', 'marrow');
    }

    // Effetti rumore/blur
    let noiseOpacity = state.snr < 0.5 ? 0.3 : (state.snr < 1.0 ? 0.1 : 0);
    document.getElementById('ph-noise').setAttribute('opacity', noiseOpacity);
    document.getElementById('phantom-container').style.filter = state.accelType === 'CS' ? 'blur(0.5px) contrast(110%)' : 'none';
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => { 
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.target));
    });
    switchTab('routine'); 
    calculatePhysics(); 
});
