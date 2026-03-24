// ============================================================================
// STRICT PHYSICS & UI RESTORATION - MRI ENGINE
// ============================================================================

// --- 1. STATE OBJECT (ALL SYNGO PARAMETERS) ---
const state = {
    // Routine
    slabGroup: '1', slabs: 1, slices: 60, position: 'HFS', orientation: 'Transversal', phaseEncDir: 'R >> L',
    phaseOS: 0.0, sliceOS: 0.0, fovRead: 220.0, fovPhasePct: 100.0, sliceThick: 3.0, tr: 4000.0, te: 100.0, nex: 1.0, conc: 1,
    autoAlign: 'Head > Brain', coilElements: 'HC1-7;NC1,2',
    
    // Contrast
    flipAngle: 120.0, saturation: 'Standard', darkBlood: false, bloodSuppression: 'Off',
    dynamicMode: 'Standard', measurements: 1, multipleSeries: 'Off', reordering: 'Linear',
    
    // Resolution
    baseRes: 320, phaseResPct: 100.0, sliceResPct: 100.0, interp: '0',
    accelType: 'GRAPPA', accelR: 2.0, refScans: 'Integrated', accelPE: 2.0, refLinesPE: 24, 
    accel3D: 1.0, refLines3D: 24, reorderShift3D: 0, phasePartial: 100.0, slicePartial: 100.0, csFactor: 2.0,
    
    // Physio
    fovReadPhaseText: '220 / 100',
    
    // Sequence
    seqName: 'TSE', dimension: '2D', bw: 250.0, echoSpacing: 8.0, turboFactor: 15, echoTrainDuration: 120.0,
    
    // Setup
    region: 'abdomen', patWeight: 75, patHeight: 175
};

// --- 2. CONFIGURATION OBJECT (STRICT UI RESTORATION) ---
const config = {
    routine: [
        { section: 'Routine', fields:[
            { id: 'slabGroup', label: 'Slab Group', val: state.slabGroup, type: 'text' },
            { id: 'slabs', label: 'Slabs', val: state.slabs, type: 'number', step: 1 },
            { id: 'slices', label: 'Slices per Slab', val: state.slices, type: 'number', step: 1 },
            { id: 'position', label: 'Position', val: state.position, type: 'text' },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options:['Transversal', 'Coronal', 'Sagittal'] },
            { id: 'phaseEncDir', label: 'Phase Encoding Dir.', val: state.phaseEncDir, type: 'select', options:['R >> L', 'A >> P', 'H >> F'] },
            { id: 'phaseOS', label: 'Phase Oversampling %', val: state.phaseOS, type: 'number', step: 10 },
            { id: 'sliceOS', label: 'Slice Oversampling %', val: state.sliceOS, type: 'number', step: 10 },
            { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number', step: 10 },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number', step: 5 },
            { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number', step: 0.5 },
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number', step: 100 },
            { id: 'te', label: 'TEeff ms', val: state.te, type: 'number', step: 5 },
            { id: 'nex', label: 'Averages (NEX)', val: state.nex, type: 'number', step: 1 },
            { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number', step: 1 },
            { id: 'autoAlign', label: 'AutoAlign', val: state.autoAlign, type: 'text' },
            { id: 'coilElements', label: 'Coil Elements', val: state.coilElements, type: 'text' }
        ]}
    ],
    contrast:[
        { section: 'Common', fields:[
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number', step: 100 },
            { id: 'te', label: 'TE ms', val: state.te, type: 'number', step: 5 },
            { id: 'flipAngle', label: 'Flip Angle deg', val: state.flipAngle, type: 'number', step: 5 },
            { id: 'saturation', label: 'Fat-Water Contrast', val: state.saturation, type: 'select', options: ['Standard', 'Fat Sat', 'Water Sat'] },
            { id: 'darkBlood', label: 'Dark Blood', val: state.darkBlood, type: 'checkbox' },
            { id: 'bloodSuppression', label: 'Blood Suppression', val: state.bloodSuppression, type: 'select', options: ['Off', 'On'] }
        ]},
        { section: 'Dynamic', fields:[
            { id: 'dynamicMode', label: 'Dynamic Mode', val: state.dynamicMode, type: 'select', options: ['Standard', 'Free Breathing'] },
            { id: 'measurements', label: 'Measurements', val: state.measurements, type: 'number', step: 1 },
            { id: 'multipleSeries', label: 'Multiple Series', val: state.multipleSeries, type: 'select', options: ['Off', 'Each Measurement'] },
            { id: 'reordering', label: 'Reordering', val: state.reordering, type: 'select', options: ['Linear', 'Centric'] }
        ]}
    ],
    resolution: [
        { section: 'Common', fields:[
            { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number' },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number' },
            { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number' },
            { id: 'baseRes', label: 'Base Resolution (Nx)', val: state.baseRes, type: 'number', step: 64 },
            { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number', step: 5 },
            { id: 'sliceResPct', label: 'Slice Resolution %', val: state.sliceResPct, type: 'number', step: 5 },
            { id: 'interp', label: 'Interpolation', val: state.interp, type: 'select', options: ['0', '1'] }
        ]},
        { section: 'Acceleration', fields:[
            { id: 'accelType', label: 'Acceleration Mode', val: state.accelType, type: 'select', options:['None', 'GRAPPA', 'CAIPIRINHA', 'CS'] },
            { id: 'accelR', label: 'Total Factor R', val: state.accelR, type: 'number', readOnly: true },
            { id: 'refScans', label: 'Reference Scans', val: state.refScans, type: 'text' },
            { id: 'accelPE', label: 'Acceleration Factor PE', val: state.accelPE, type: 'number', step: 1 },
            { id: 'refLinesPE', label: 'Reference Lines PE', val: state.refLinesPE, type: 'number', step: 2 },
            { id: 'accel3D', label: 'Acceleration Factor 3D', val: state.accel3D, type: 'number', step: 1 },
            { id: 'refLines3D', label: 'Reference Lines 3D', val: state.refLines3D, type: 'number', step: 2 },
            { id: 'reorderShift3D', label: 'Reordering Shift 3D', val: state.reorderShift3D, type: 'number', step: 1 },
            { id: 'phasePartial', label: 'Phase Partial Fourier %', val: state.phasePartial, type: 'number', step: 12.5 },
            { id: 'slicePartial', label: 'Slice Partial Fourier %', val: state.slicePartial, type: 'number', step: 12.5 },
            { id: 'csFactor', label: 'CS Factor', val: state.csFactor, type: 'range', min: 1, max: 10, step: 0.1 }
        ]}
    ],
    geometry: [
        { section: 'Geometry', fields:[
            { id: 'slabGroup', label: 'Slab Group', val: state.slabGroup, type: 'text' },
            { id: 'slabs', label: 'Slabs', val: state.slabs, type: 'number' },
            { id: 'slices', label: 'Slices', val: state.slices, type: 'number' },
            { id: 'position', label: 'Position', val: state.position, type: 'text' },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options: ['Transversal', 'Coronal', 'Sagittal'] },
            { id: 'phaseEncDir', label: 'Phase Enc Dir', val: state.phaseEncDir, type: 'text' },
            { id: 'phaseOS', label: 'Phase OS %', val: state.phaseOS, type: 'number' },
            { id: 'sliceOS', label: 'Slice OS %', val: state.sliceOS, type: 'number' },
            { id: 'fovRead', label: 'FOV Read', val: state.fovRead, type: 'number' },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number' },
            { id: 'sliceThick', label: 'Slice Thick mm', val: state.sliceThick, type: 'number' },
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
            { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number' }
        ]}
    ],
    physio:[
        { section: 'Physio', fields:[
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
            { id: 'fovReadPhaseText', label: 'FOV Read / Phase', val: state.fovReadPhaseText, type: 'text', readOnly: true },
            { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number' }
        ]}
    ],
    sequence:[
        { section: 'Sequence', fields:[
            { id: 'seqName', label: 'Sequence Name', val: state.seqName, type: 'text' },
            { id: 'dimension', label: 'Dimension', val: state.dimension, type: 'select', options: ['2D', '3D'] },
            { id: 'bw', label: 'Bandwidth (Hz/Px)', val: state.bw, type: 'number', step: 10 },
            { id: 'echoSpacing', label: 'Echo Spacing (ms)', val: state.echoSpacing, type: 'number', step: 0.1 },
            { id: 'turboFactor', label: 'Turbo Factor (ETL)', val: state.turboFactor, type: 'number', step: 1 },
            { id: 'echoTrainDuration', label: 'Echo Train Duration', val: state.echoTrainDuration, type: 'number', step: 10 }
        ]}
    ],
    setup: [
        { section: 'Setup', fields:[
            { id: 'region', label: 'Distretto Anatomico', val: state.region, type: 'select', options:['abdomen', 'pelvis', 'thorax', 'head'] },
            { id: 'patWeight', label: 'Peso (kg)', val: state.patWeight, type: 'number', step: 1 },
            { id: 'patHeight', label: 'Altezza (cm)', val: state.patHeight, type: 'number', step: 1 },
            { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'autoIso()' }
        ]}
    ]
};

// --- 3. LOGIN RESTORATION ---
document.getElementById('login-btn').addEventListener('click', checkPassword);
document.getElementById('login-pwd').addEventListener('keydown', (e) => { 
    if (e.key === 'Enter') checkPassword(); 
});

function checkPassword() {
    if (document.getElementById('login-pwd').value === 'simulatore') {
        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('login-screen').style.display = 'none', 500);
    } else {
        document.getElementById('login-err').classList.remove('hidden');
    }
}

// --- 4. UI TAB RENDERING & FOCUS PRESERVATION ---
function switchTab(tabKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-slate-800', 'border-blue-500', 'text-white');
    });
    const btn = document.querySelector(`[data-target="${tabKey}"]`);
    if(btn) btn.classList.add('active', 'bg-slate-800', 'border-blue-500', 'text-white');
    renderTabContent(tabKey);
}

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
                inp = `<select id="inp-${f.id}" onchange="updateState('${f.id}', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 text-xs text-slate-200 outline-none">
                    ${f.options.map(o => `<option value="${o}" ${val === o ? 'selected' : ''}>${o}</option>`).join('')}</select>`;
            } else if (f.type === 'range') {
                inp = `<div class="flex items-center gap-2"><input type="range" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" class="w-full accent-blue-500"><span id="val-${f.id}" class="text-xs font-mono text-blue-400 w-8 text-right">${val}</span></div>`;
            } else if (f.type === 'checkbox') {
                inp = `<input type="checkbox" id="inp-${f.id}" onchange="updateState('${f.id}', this.checked)" ${val ? 'checked' : ''} class="mt-1 w-4 h-4 accent-blue-500 bg-slate-900 border border-slate-700 rounded cursor-pointer outline-none">`;
            } else if (f.type === 'button') {
                inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500 outline-none transition-colors">${f.label}</button>`;
            } else {
                inp = `<input type="${f.type}" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} ${f.readOnly ? 'readonly' : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs text-slate-200 outline-none ${f.readOnly ? 'text-slate-500 bg-slate-950 cursor-not-allowed' : ''}">`;
            }

            html += `<div class="flex flex-col gap-1 justify-end wrapper-${f.id}">
                ${f.type !== 'button' ? `<label class="text-[10px] uppercase text-slate-400">${f.label}</label>` : ''}${inp}</div>`;
        });
        container.innerHTML += `<div class="mb-6">${html}</div></div>`;
    });
    
    applyUIConstraints();
}

function updateState(key, value) {
    // Preserve Data Types
    const stringKeys =['slabGroup', 'position', 'orientation', 'phaseEncDir', 'autoAlign', 'coilElements', 'saturation', 'dynamicMode', 'multipleSeries', 'reordering', 'interp', 'accelType', 'refScans', 'seqName', 'dimension', 'region', 'fovReadPhaseText', 'bloodSuppression'];
    
    if (typeof value === 'boolean') {
        state[key] = value;
    } else if (stringKeys.includes(key)) {
        state[key] = value;
    } else {
        state[key] = parseFloat(value) || 0;
    }
    
    // Non-destructive DOM sync
    document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => {
        if (el.type === 'checkbox') {
            if (el.checked !== value) el.checked = value;
        } else {
            if (el.value != value) el.value = value;
        }
    });

    // Update range numeric indicator
    const rangeVal = document.getElementById(`val-${key}`);
    if (rangeVal) rangeVal.innerText = state[key];

    // Compute physics & adjust UI constraints
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
    const isCS = state.accelType === 'CS';
    const isNone = state.accelType === 'None';

    // Toggle 3D Specific fields
    const fields3D =['slabs', 'sliceResPct', 'accel3D', 'refLines3D', 'reorderShift3D', 'slicePartial', 'sliceOS'];
    fields3D.forEach(id => {
        document.querySelectorAll(`[id="inp-${id}"]`).forEach(el => {
            el.disabled = is2D;
            const wrapper = el.closest(`.wrapper-${id}`);
            if (wrapper) wrapper.style.opacity = is2D ? '0.3' : '1';
        });
    });

    // Handle Acceleration Constraints
    document.querySelectorAll(`[id="inp-csFactor"]`).forEach(el => {
        const wrapper = el.closest(`.wrapper-csFactor`);
        if (wrapper) wrapper.style.display = isCS ? 'flex' : 'none';
    });

    const standardPIFields =['accelPE', 'refLinesPE'];
    standardPIFields.forEach(id => {
        document.querySelectorAll(`[id="inp-${id}"]`).forEach(el => {
            const disable = isCS || isNone;
            el.disabled = disable;
            const wrapper = el.closest(`.wrapper-${id}`);
            if (wrapper) wrapper.style.opacity = disable ? '0.3' : '1';
        });
    });

    // Update derived values safely
    state.fovReadPhaseText = `${state.fovRead} / ${state.fovPhasePct} %`;
    document.querySelectorAll(`[id="inp-fovReadPhaseText"]`).forEach(el => el.value = state.fovReadPhaseText);
}

// --- 5. STRICT PHYSICS & MATHEMATICS ENGINE ---
function calculatePhysics() {
    // A. Matrice Effettiva
    const N_x = state.baseRes;
    const fovPhase = state.fovPhasePct / 100;
    const phaseRes = state.phaseResPct / 100;
    const phaseOS = 1 + (state.phaseOS / 100);
    const phasePartial = state.phasePartial / 100;

    const effNy = N_x * fovPhase * phaseRes * phaseOS * phasePartial;

    let effNz = 1;
    if (state.dimension === '3D') {
        const sliceOS = 1 + (state.sliceOS / 100);
        const slicePartial = state.slicePartial / 100;
        effNz = state.slices * sliceOS * slicePartial;
    }

    // Risoluzione Voxel
    const dx = state.fovRead / N_x;
    const nominalNy = N_x * fovPhase * phaseRes;
    const dy = (state.fovRead * fovPhase) / nominalNy; 

    let dz = 0;
    if (state.dimension === '3D') {
        const slabThickness = state.slices * state.sliceThick;
        dz = slabThickness / effNz;
    } else {
        dz = state.sliceThick;
    }

    const Voxel = dx * dy * dz;
    const isIsotropic = Math.abs(dx - dy) <= 0.05 && Math.abs(dx - dz) <= 0.05;

    // B. Accelerazione (R_eff e g-factor)
    let R_eff = 1.0;
    let g = 1.0;

    if (state.accelType === 'CS') {
        R_eff = state.csFactor;
        g = 1.0;
    } else if (state.accelType === 'GRAPPA') {
        R_eff = state.dimension === '3D' ? (state.accelPE * state.accel3D) : state.accelPE;
        g = 1.0 + (R_eff - 1) * 0.15;
    } else if (state.accelType === 'CAIPIRINHA') {
        R_eff = state.dimension === '3D' ? (state.accelPE * state.accel3D) : state.accelPE;
        g = 1.0 + (R_eff - 1) * 0.05;
    }
    
    // Sync R_eff into the UI read-only field
    updateState('accelR', parseFloat(R_eff.toFixed(2)));

    // C. Tempo di Acquisizione (TA)
    let Shots = 0;
    let TA_sec = 0;

    if (state.dimension === '3D') {
        Shots = (effNy * effNz) / (state.turboFactor * R_eff);
        // Multiply by slabs if multiple slabs configured
        Shots *= state.slabs;
        TA_sec = (Shots * state.tr * state.nex) / 1000;
    } else {
        Shots = effNy / (state.turboFactor * R_eff);
        let maxSlicesPerTR = Math.floor(state.tr / ((state.echoSpacing * state.turboFactor) + 20));
        maxSlicesPerTR = Math.max(1, maxSlicesPerTR); // Prevent div by zero
        TA_sec = (Shots * state.tr * state.nex * Math.ceil(state.slices / maxSlicesPerTR)) / 1000;
    }

    // D. Equazione del Signal-to-Noise Ratio (SNR)
    const TermineAcq = (effNy * effNz * state.nex) / (state.bw * 14500);
    const SNR_base = (Voxel / 0.64) * Math.sqrt(TermineAcq) * Math.exp(-state.te / 85) * 3.5;

    let SNR_final = 0;
    if (state.accelType === 'CS') {
        SNR_final = (SNR_base / Math.sqrt(state.csFactor)) * 1.2;
    } else {
        SNR_final = SNR_base / (g * Math.sqrt(R_eff));
    }

    // SAR Base Estimate (just for UI completeness, standard clinical approximation)
    const bmi = state.patWeight / Math.pow(state.patHeight / 100, 2);
    let sar = (0.002 * state.turboFactor * bmi / (state.tr / 1000)) * Math.pow(state.flipAngle / 90, 2);
    if (state.dimension === '3D') sar *= state.slabs;

    // --- DOM OUTPUT UPDATES ---
    const taMin = Math.floor(TA_sec / 60);
    const taSec = Math.round(TA_sec % 60).toString().padStart(2, '0');
    
    document.getElementById('out-ta').innerText = `${taMin}:${taSec}`;
    document.getElementById('out-res').innerText = `${dx.toFixed(2)} × ${dy.toFixed(2)} × ${dz.toFixed(2)} mm`;
    document.getElementById('out-snr-final').innerText = SNR_final.toFixed(2);
    
    let totalSlices = state.dimension === '3D' ? (state.slabs * state.slices) : state.slices;
    document.getElementById('out-etl').innerText = `${totalSlices} sl / ${state.turboFactor} etl`;

    const sarEl = document.getElementById('out-sar');
    sarEl.innerText = sar.toFixed(2);
    sarEl.className = sar > 3.2 
        ? 'font-mono text-sm text-red-400 font-bold border-b border-red-500 animate-pulse' 
        : 'font-mono text-sm text-slate-200 border-b border-transparent';

    const isoEl = document.getElementById('out-iso');
    isoEl.innerText = isIsotropic ? 'ISO ✅' : 'ANISO';
    isoEl.className = `font-bold text-[10px] ${isIsotropic ? 'text-green-500' : 'text-yellow-600'}`;

    // Update phantom visual rendering logic if function exists (assuming it is maintained externally as requested)
    if (typeof renderSVGPhantom === 'function') {
        renderSVGPhantom();
    }
}

// --- 6. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => { 
    // Setup Tab listeners once
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.target));
    });
    
    // Mount initial view
    switchTab('routine'); 
    calculatePhysics(); 
});
