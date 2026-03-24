const API_URL = "https://mri-physics-core.onrender.com/calculate";

const state = {
    // Routine
    slabGroup: '1.0', slabs: '1.0', slices: 60, position: '0.0', orientation: 'Transversal', phaseEncDir: 'R >> L',
    phaseOS: 30.0, sliceOS: 5.0, fovRead: 220.0, fovPhasePct: 100.0, sliceThick: 1.0, tr: 2200.0, te: 105.0, nex: 1.80, conc: 1,
    autoAlign: 'Head > Brain', coilElements: 'BO2,3;SP4,5',
    // Contrast
    flipAngle: 135.0, saturation: 'Standard', darkBlood: false, bloodSuppression: 'Off',
    dynamicMode: 'Standard', measurements: 1.0, multipleSeries: 'Each Measurement', reordering: 'Linear',
    // Resolution
    baseRes: 320, phaseResPct: 91.0, sliceResPct: 81.0, interp: '1',
    // Acceleration
    accelType: 'GRAPPA', accelR: 4.0, refScans: 'GRE/Separate', accelPE: 2.0, refLinesPE: 24, accel3D: 2.0, refLines3D: 24,
    reorderShift3D: 1.0, phasePartial: 100.0, slicePartial: 100.0, gFactor: 1.0, csFactor: 2.0,
    // Physio
    fovReadPhaseText: '220 / 100 %',
    // Sequence
    seqName: 'SPACE 3D', dimension: '3D', bw: 521.0, echoSpacing: 4.4, turboFactor: 64, echoTrainDuration: 220.0,
    // Setup Patient
    region: 'abdomen', patWeight: 75, patHeight: 175
};

const config = {
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
            { id: 'patWeight', label: 'Peso kg', val: state.patWeight, type: 'number' },
            { id: 'patHeight', label: 'Altezza cm', val: state.patHeight, type: 'number' }
        ]},
        { section: 'Tools', fields:[
            { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'autoIso()' }
        ]}
    ]
};

// Login 
document.getElementById('login-btn').addEventListener('click', checkPassword);
document.getElementById('login-pwd').addEventListener('keydown', (e) => { if(e.key==='Enter') checkPassword(); });
function checkPassword() {
    if (document.getElementById('login-pwd').value === 'simulatore') {
        document.getElementById('login-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('login-screen').style.display = 'none', 500);
    } else {
        document.getElementById('login-err').classList.remove('hidden');
    }
}

// Auto ISO Workflow
function autoIso() {
    const dx = state.fovRead / state.baseRes;
    state.sliceThick = parseFloat(dx.toFixed(2));
    state.phaseResPct = 100;
    state.sliceResPct = 100;
    state.fovPhasePct = 100;
    
    // Aggiorna visivamente solo gli input che sono attualmente montati nel DOM per non perdere il focus
    document.querySelectorAll(`[id="inp-sliceThick"]`).forEach(el => el.value = state.sliceThick);
    document.querySelectorAll(`[id="inp-phaseResPct"]`).forEach(el => el.value = 100);
    document.querySelectorAll(`[id="inp-sliceResPct"]`).forEach(el => el.value = 100);
    document.querySelectorAll(`[id="inp-fovPhasePct"]`).forEach(el => el.value = 100);
    
    calculatePhysics();
    applyUIConstraints();
}

// Render Tabs & UI Updates (Fix Focus Bug)
function renderTabContent(tabKey) {
    const container = document.getElementById('parameters-container');
    container.innerHTML = '';
    if(!config[tabKey]) return;

    config[tabKey].forEach(sec => {
        let html = `<h3 class="text-xs font-bold text-blue-500 mb-3 uppercase border-b border-slate-700 pb-1">${sec.section}</h3><div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">`;
        sec.fields.forEach(f => {
            let val = state[f.id] !== undefined ? state[f.id] : f.val;
            let inp = '';
            
            if (f.type === 'select') {
                inp = `<select id="inp-${f.id}" onchange="updateState('${f.id}', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 text-xs transition-opacity">
                    ${f.options.map(o => `<option value="${o}" ${val == o ? 'selected' : ''}>${o}</option>`).join('')}</select>`;
            } else if (f.type === 'range') {
                inp = `<div class="flex items-center gap-2"><input type="range" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" class="w-full accent-blue-500"><span id="val-${f.id}" class="text-xs font-mono text-blue-400">${val}</span></div>`;
            } else if (f.type === 'checkbox') {
                inp = `<input type="checkbox" id="inp-${f.id}" onchange="updateState('${f.id}', this.checked)" ${val ? 'checked' : ''} class="mt-1 w-4 h-4 bg-slate-900 border border-slate-700 rounded focus:ring-blue-500">`;
            } else if (f.type === 'button') {
                inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500 outline-none">${f.label}</button>`;
            } else {
                inp = `<input type="${f.type}" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} ${f.readOnly ? 'readonly' : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs transition-opacity ${f.readOnly ? 'text-slate-500' : ''}">`;
            }

            html += `<div class="flex flex-col gap-1 transition-opacity justify-end">
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

// Chiamata solo all'input senza ridisegnare l'intero DOM (Mantiene il Focus)
function updateState(key, value) {
    if (typeof value === 'boolean') {
        state[key] = value;
    } else if (['dimension', 'orientation', 'saturation', 'accelType', 'position', 'phaseEncDir', 'autoAlign', 'coilElements', 'dynamicMode', 'multipleSeries', 'reordering', 'refScans', 'seqName', 'region', 'interp', 'bloodSuppression'].includes(key)) {
        state[key] = value;
    } else {
        state[key] = parseFloat(value) || 0;
    }
    
    // Aggiorna visivamente TUTTI gli input corrispondenti a questa chiave (in altri tab se fossero in cache, o read-only)
    document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => {
        if(el.type === 'checkbox') el.checked = value;
        else if (el.value != value) el.value = value;
    });
    if(document.getElementById(`val-${key}`)) document.getElementById(`val-${key}`).innerText = value;
    
    calculatePhysics();
    applyUIConstraints(); 
}

function applyUIConstraints() {
    const is2D = state.dimension === '2D';
    const isCS = state.accelType === 'CS';
    
    const accelSelect = document.getElementById('inp-accelType');
    if (accelSelect) {
        for (let i=0; i<accelSelect.options.length; i++) {
            if (accelSelect.options[i].value === 'CAIPIRINHA') {
                accelSelect.options[i].disabled = is2D;
                if (is2D && state.accelType === 'CAIPIRINHA') {
                    updateState('accelType', 'GRAPPA');
                }
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
}

function updatePhantomVisibility() {
    document.querySelectorAll('g[id^="ph-group-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('div[id^="legend-"]').forEach(el => el.classList.add('hidden'));

    let viewId = state.region;
    const activeGroup = document.getElementById(`ph-group-${viewId}`);
    if(activeGroup) activeGroup.classList.remove('hidden');

    const activeLegend = document.getElementById(`legend-${viewId}`);
    if(activeLegend) activeLegend.classList.remove('hidden');

    const titles = { 
        'abdomen': 'Axial Abdomen', 
        'pelvis': 'Axial Pelvis / Prostate',
        'thorax': 'Axial Thorax', 
        'head': 'Axial Brain'
    };
    document.getElementById('phantom-title').innerText = titles[viewId] || 'Phantom';
}

// Engine API & Physics
async function fetchSignalFromJava(t1, t2, pd, tr, te, isFat) {
    if (state.saturation === 'Fat Sat' && isFat) return `rgb(10, 10, 10)`;
    if (state.saturation === 'Water Sat' && !isFat) return `rgb(10, 10, 10)`;

    try {
        const url = `${API_URL}?pd=${pd}&t1=${t1}&t2=${t2}&tr=${tr}&te=${te}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("API call failed");
        const data = await response.json();
        
        const signal = data.Signal;
        const gray = Math.min(255, Math.max(10, Math.round(signal * 850)));
        return `rgb(${gray}, ${gray}, ${gray})`;
    } catch (err) {
        const signal = pd * (1 - Math.exp(-tr / t1)) * Math.exp(-te / t2);
        const gray = Math.min(255, Math.max(10, Math.round(signal * 850)));
        return `rgb(${gray}, ${gray}, ${gray})`;
    }
}

async function calculatePhysics() {
    updatePhantomVisibility();

    const is3D = state.dimension === '3D';
    const isCS = state.accelType === 'CS';
    const effR = isCS ? 1.0 : state.accelR;

    const N_x = state.baseRes;
    const N_y = Math.round(state.baseRes * (state.fovPhasePct / 100) * (state.phaseResPct / 100));
    let N_z = is3D ? Math.round(state.slices * (state.sliceResPct / 100)) : 1;

    const dx = state.fovRead / N_x;
    let dy = (state.fovRead * (state.fovPhasePct / 100)) / N_y;
    if (state.fovPhasePct === 100 && state.phaseResPct === 100) dy = dx; 
    let dz = is3D ? (state.slices * state.sliceThick) / N_z : state.sliceThick;

    const V_voxel = dx * dy * dz;
    const isIsotropic = (Math.max(dx, dy, dz) - Math.min(dx, dy, dz)) <= 0.01;

    const effNy = N_y * (1 + state.phaseOS / 100) * (state.phasePartial / 100);
    
    let taSeconds = 0;
    let displayedShots = 0;

    if (is3D) {
        const effNz = N_z * (1 + state.sliceOS / 100) * (state.slicePartial / 100);
        const totalLines = effNy * effNz;
        taSeconds = (totalLines * state.nex * state.tr) / (state.turboFactor * effR * 1000);
        displayedShots = totalLines / (state.turboFactor * effR);
    } else {
        const totalLines = effNy * state.slices;
        const fettePerTR = Math.max(1, Math.floor(state.tr / (state.echoSpacing * state.turboFactor + 10)));
        taSeconds = (totalLines * state.nex) / (state.turboFactor * effR * fettePerTR) * (state.tr / 1000);
        displayedShots = totalLines / (state.turboFactor * effR);
    }
    
    if(isCS) {
        taSeconds = taSeconds / state.csFactor;
        displayedShots = displayedShots / state.csFactor;
    }

    const bmi = state.patWeight / Math.pow(state.patHeight/100, 2);
    const sar = (0.002 * state.turboFactor * bmi / (state.tr / 1000)) * Math.pow(state.flipAngle / 180, 2);

    const bwHzPx = state.bw / N_y; 
    const acqTerm = is3D ? (state.nex * N_y * N_z) / 14500 : (state.nex * N_y) / 14500;
    
    let snrBase = (V_voxel / 0.64) * Math.sqrt(acqTerm) * Math.sqrt(521 / state.bw) * Math.exp(-state.te / 85) * 3.5; 
    
    let snrFinal = snrBase;
    if (bwHzPx < 100) snrFinal *= 1.15; else if (bwHzPx > 250) snrFinal *= 0.60;

    if (isCS) {
        snrFinal *= Math.sqrt(1.0 / state.csFactor) * (Math.sqrt(state.csFactor) * 0.9);
    } else {
        let g_eff = state.accelType === 'CAIPIRINHA' ? Math.max(1.0, state.gFactor - 0.3) : state.gFactor;
        snrFinal *= (1 / (g_eff * Math.sqrt(effR)));
    }

    document.getElementById('out-ta').innerText = `${Math.floor(taSeconds / 60)}:${Math.round(taSeconds % 60).toString().padStart(2, '0')}`;
    document.getElementById('out-etl').innerText = `${state.turboFactor} / ${Math.ceil(displayedShots)}`;
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

    await renderSVGPhantom(snrFinal, bwHzPx);
}

async function renderSVGPhantom(snrFinal, bwHzPx) {
    if (state.region === 'abdomen') {
        const[c_liver, c_spleen, c_kidney_c, c_kidney_m, c_muscle, c_fat, c_spine] = await Promise.all([
            fetchSignalFromJava(1200, 160, 0.85, state.tr, state.te, false),
            fetchSignalFromJava(1000, 120, 0.90, state.tr, state.te, false),
            fetchSignalFromJava(1100, 130, 0.90, state.tr, state.te, false),
            fetchSignalFromJava(1100, 130, 0.90, state.tr, state.te, false),
            fetchSignalFromJava(900, 50, 0.80, state.tr, state.te, false),
            fetchSignalFromJava(250, 80, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(300, 60, 0.80, state.tr, state.te, false)
        ]);

        document.getElementById('ph-abd-liver')?.setAttribute('fill', c_liver);
        document.getElementById('ph-abd-spleen')?.setAttribute('fill', c_spleen);
        document.getElementById('ph-abd-kidney-r-cortex')?.setAttribute('fill', c_kidney_c);
        document.getElementById('ph-abd-kidney-r-medulla')?.setAttribute('fill', c_kidney_m);
        document.getElementById('ph-abd-kidney-l-cortex')?.setAttribute('fill', c_kidney_c);
        document.getElementById('ph-abd-kidney-l-medulla')?.setAttribute('fill', c_kidney_m);
        document.getElementById('ph-abd-muscle')?.setAttribute('fill', c_muscle);
        document.getElementById('ph-abd-fat')?.setAttribute('fill', c_fat);
        document.getElementById('ph-abd-spine')?.setAttribute('fill', c_spine);

        if(document.getElementById('leg-abd-liver')) document.getElementById('leg-abd-liver').style.backgroundColor = c_liver;
        if(document.getElementById('leg-abd-spleen')) document.getElementById('leg-abd-spleen').style.backgroundColor = c_spleen;
        if(document.getElementById('leg-abd-kidney')) document.getElementById('leg-abd-kidney').style.backgroundColor = c_kidney_c;
        if(document.getElementById('leg-abd-fat')) document.getElementById('leg-abd-fat').style.backgroundColor = c_fat;
    } 
    else if (state.region === 'pelvis') {
        let t1pz = 1200, t2pz = 130, pdPz = 0.9;
        let t1tz = 1000, t2tz = 80, pdTz = 0.8;
        
        if (state.te >= 100) {
            const edemaFactor = Math.min(2.0, 1.0 + ((state.te - 100) / 100)); 
            t2pz = 180; pdPz = 0.9 * edemaFactor;
            t2tz = 100; pdTz = 0.8 * edemaFactor;
        }

        const[c_pz, c_tz, c_bladder, c_muscle, c_fat, c_bone_c, c_bone_m, c_rectum] = await Promise.all([
            fetchSignalFromJava(t1pz, t2pz, pdPz, state.tr, state.te, false),
            fetchSignalFromJava(t1tz, t2tz, pdTz, state.tr, state.te, false),
            fetchSignalFromJava(3000, 1000, 1.0, state.tr, state.te, false),
            fetchSignalFromJava(900, 50, 0.8, state.tr, state.te, false),
            fetchSignalFromJava(250, 80, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(2000, 10, 0.1, state.tr, state.te, false),
            fetchSignalFromJava(350, 60, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(800, 50, 0.5, state.tr, state.te, false)
        ]);

        document.getElementById('ph-pelvis-pz')?.setAttribute('fill', c_pz);
        document.getElementById('ph-pelvis-tz')?.setAttribute('fill', c_tz);
        document.getElementById('ph-pelvis-bladder')?.setAttribute('fill', c_bladder);
        document.getElementById('ph-pelvis-muscle')?.setAttribute('fill', c_muscle);
        document.getElementById('ph-pelvis-fat')?.setAttribute('fill', c_fat);
        document.getElementById('ph-pelvis-bone-l')?.setAttribute('fill', c_bone_c);
        document.getElementById('ph-pelvis-bone-r')?.setAttribute('fill', c_bone_c);
        document.getElementById('ph-pelvis-femur-l')?.setAttribute('fill', c_bone_m);
        document.getElementById('ph-pelvis-femur-r')?.setAttribute('fill', c_bone_m);
        document.getElementById('ph-pelvis-rectum')?.setAttribute('fill', c_rectum);

        if(document.getElementById('leg-pelvis-pz')) document.getElementById('leg-pelvis-pz').style.backgroundColor = c_pz;
        if(document.getElementById('leg-pelvis-tz')) document.getElementById('leg-pelvis-tz').style.backgroundColor = c_tz;
        if(document.getElementById('leg-pelvis-bladder')) document.getElementById('leg-pelvis-bladder').style.backgroundColor = c_bladder;
        if(document.getElementById('leg-pelvis-fat')) document.getElementById('leg-pelvis-fat').style.backgroundColor = c_fat;
    }
    else if (state.region === 'thorax') {
        const[c_lung, c_heart, c_blood, c_muscle, c_fat, c_spine] = await Promise.all([
            fetchSignalFromJava(1200, 30, 0.2, state.tr, state.te, false),
            fetchSignalFromJava(900, 50, 0.8, state.tr, state.te, false),
            fetchSignalFromJava(1200, 50, 0.9, state.tr, state.te, false), 
            fetchSignalFromJava(900, 50, 0.8, state.tr, state.te, false),
            fetchSignalFromJava(250, 80, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(300, 60, 0.8, state.tr, state.te, false)
        ]);
        
        document.getElementById('ph-thorax-lung-r')?.setAttribute('fill', c_lung);
        document.getElementById('ph-thorax-lung-l')?.setAttribute('fill', c_lung);
        document.getElementById('ph-thorax-heart-lv')?.setAttribute('fill', c_heart);
        document.getElementById('ph-thorax-heart-rv')?.setAttribute('fill', c_heart);
        document.getElementById('ph-thorax-heart-la')?.setAttribute('fill', c_heart);
        document.getElementById('ph-thorax-heart-ra')?.setAttribute('fill', c_heart);
        document.getElementById('ph-thorax-aorta')?.setAttribute('fill', c_blood);
        document.getElementById('ph-thorax-muscle')?.setAttribute('fill', c_muscle);
        document.getElementById('ph-thorax-fat')?.setAttribute('fill', c_fat);
        document.getElementById('ph-thorax-spine')?.setAttribute('fill', c_spine);

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
            fetchSignalFromJava(4000, 2000, 1.0, effTR, effTE, false),
            fetchSignalFromJava(1200, 100, 0.85, effTR, effTE, false),
            fetchSignalFromJava(600, 80, 0.75, effTR, effTE, false),
            fetchSignalFromJava(250, 80, 1.0, effTR, effTE, true),
            fetchSignalFromJava(2000, 10, 0.1, effTR, effTE, false)
        ]);

        document.getElementById('ph-head-csf')?.setAttribute('fill', c_csf);
        document.getElementById('ph-head-csf-outer')?.setAttribute('fill', c_csf);
        document.getElementById('ph-head-gm')?.setAttribute('fill', c_gm);
        document.getElementById('ph-head-wm')?.setAttribute('fill', c_wm);
        document.getElementById('ph-head-fat')?.setAttribute('fill', c_fat);
        document.getElementById('ph-head-bone')?.setAttribute('fill', c_bone);

        if(document.getElementById('leg-hd-csf')) document.getElementById('leg-hd-csf').style.backgroundColor = c_csf;
        if(document.getElementById('leg-hd-gm')) document.getElementById('leg-hd-gm').style.backgroundColor = c_gm;
        if(document.getElementById('leg-hd-wm')) document.getElementById('leg-hd-wm').style.backgroundColor = c_wm;
        if(document.getElementById('leg-hd-bone')) document.getElementById('leg-hd-bone').style.backgroundColor = c_bone;
    }

    let baseNoise = Math.max(0, (1.0 - snrFinal) * 0.3);
    let gFactorOpacity = (state.accelType === 'GRAPPA' || state.accelType === 'CAIPIRINHA') && state.accelR > 2.0 ? (state.accelR - 2.0) * 0.15 * state.gFactor : 0;
    
    if (state.accelType === 'CS') {
        const cleanFactor = state.csFactor * 0.05;
        baseNoise = Math.max(0, baseNoise - cleanFactor);
        gFactorOpacity = Math.max(0, gFactorOpacity - cleanFactor);
        document.getElementById('phantom-container').style.filter = `grayscale(100%) blur(${(state.csFactor - 1) * 0.3}px) contrast(110%)`;
    } else {
        document.getElementById('phantom-container').style.filter = 'grayscale(100%)';
    }

    document.getElementById('ph-noise').setAttribute('opacity', baseNoise);
    document.getElementById('ph-noise-gfactor').setAttribute('opacity', gFactorOpacity);

    const shiftPx = bwHzPx < 100 ? 3 : (bwHzPx <= 250 ? 1 : 0);
    document.querySelectorAll('.transform-water').forEach(el => {
        el.style.transform = `translateX(${shiftPx}px)`;
        el.style.filter = shiftPx > 0 ? `drop-shadow(-${shiftPx}px 0px 0px rgba(0,0,0,1))` : '';
    });
}

// Init Setup
document.addEventListener('DOMContentLoaded', () => { 
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.target));
    });
    switchTab('routine'); 
    calculatePhysics(); 
});
