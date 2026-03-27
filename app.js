// ==========================================
// 1. STATO DELL'APPLICAZIONE (Syngo Console)
// ==========================================
const state = {
    // Routine
    slabGroup: '1', slabs: 1, slices: 60, position: 'Isocenter', orientation: 'Transversal', phaseEncDir: 'R >> L',
    phaseOS: 0.0, sliceOS: 0.0, fovRead: 220.0, fovPhasePct: 100.0, sliceThick: 3.0, tr: 3000.0, te: 100.0, nex: 1.0, conc: 1,
    autoAlign: 'Head > Brain', coilElements: 'Head/Neck 20',
    // Contrast
    flipAngle: 150.0, saturation: 'Standard', darkBlood: false, bloodSuppression: 'Off',
    dynamicMode: 'Standard', measurements: 1, multipleSeries: 'Off', reordering: 'Linear',
    // Resolution
    baseRes: 320, phaseResPct: 100.0, sliceResPct: 100.0, interp: '0',
    accelType: 'GRAPPA', accelR: 2.0, refScans: 'Separate', accelPE: 2.0, refLinesPE: 24, accel3D: 1.0, refLines3D: 24,
    reorderShift3D: 1.0, phasePartial: 100.0, slicePartial: 100.0, csFactor: 1.0,
    // Sequence
    seqName: 'TSE', dimension: '2D', bw: 250.0, echoSpacing: 8.0, turboFactor: 15, echoTrainDuration: 120.0,
    // Setup
    region: 'Head', patWeight: 75, patHeight: 175
};

// ==========================================
// 2. CONFIGURAZIONE UI
// ==========================================
const config = {
    routine:[
        { section: 'Routine', fields:[
            { id: 'slabGroup', label: 'Slab Group', val: state.slabGroup, type: 'text' },
            { id: 'slabs', label: 'Slabs', val: state.slabs, type: 'number', step: 1 },
            { id: 'slices', label: 'Slices per Slab', val: state.slices, type: 'number', step: 1 },
            { id: 'position', label: 'Position', val: state.position, type: 'text' },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options: ['Transversal', 'Coronal', 'Sagittal'] },
            { id: 'phaseEncDir', label: 'Phase Encoding Dir.', val: state.phaseEncDir, type: 'select', options: ['R >> L', 'A >> P', 'H >> F'] },
            { id: 'phaseOS', label: 'Phase Oversampling %', val: state.phaseOS, type: 'number', step: 10 },
            { id: 'sliceOS', label: 'Slice Oversampling %', val: state.sliceOS, type: 'number', step: 10 },
            { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number', step: 10 },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number', step: 5 },
            { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number', step: 0.5 },
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number', step: 100 },
            { id: 'te', label: 'TEeff ms', val: state.te, type: 'number', step: 5 },
            { id: 'nex', label: 'Averages / NEX', val: state.nex, type: 'number', step: 1 },
            { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number', step: 1 },
            { id: 'autoAlign', label: 'AutoAlign', val: state.autoAlign, type: 'text' },
            { id: 'coilElements', label: 'Coil Elements', val: state.coilElements, type: 'text' }
        ]}
    ],
    contrast: [
        { section: 'Common', fields:[
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
            { id: 'te', label: 'TE ms', val: state.te, type: 'number' },
            { id: 'flipAngle', label: 'Flip Angle deg', val: state.flipAngle, type: 'number' },
            { id: 'saturation', label: 'Fat-Water Contrast', val: state.saturation, type: 'select', options: ['Standard', 'Fat Sat', 'Water Sat'] },
            { id: 'darkBlood', label: 'Dark Blood', val: state.darkBlood, type: 'checkbox' },
            { id: 'bloodSuppression', label: 'Blood Suppression', val: state.bloodSuppression, type: 'select', options: ['Off', 'On'] }
        ]},
        { section: 'Dynamic', fields:[
            { id: 'dynamicMode', label: 'Dynamic Mode', val: state.dynamicMode, type: 'text' },
            { id: 'measurements', label: 'Measurements', val: state.measurements, type: 'number' },
            { id: 'multipleSeries', label: 'Multiple Series', val: state.multipleSeries, type: 'select', options: ['Off', 'On'] },
            { id: 'reordering', label: 'Reordering', val: state.reordering, type: 'select', options:['Linear', 'Centric'] }
        ]}
    ],
    resolution:[
        { section: 'Common', fields:[
            { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number' },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number' },
            { id: 'sliceThick', label: 'Slice Thickness mm', val: state.sliceThick, type: 'number' },
            { id: 'baseRes', label: 'Base Resolution (Nx)', val: state.baseRes, type: 'number', step: 16 },
            { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number', step: 5 },
            { id: 'sliceResPct', label: 'Slice Resolution %', val: state.sliceResPct, type: 'number', step: 5 },
            { id: 'interp', label: 'Interpolation', val: state.interp, type: 'select', options: ['0', '1'] }
        ]},
        { section: 'Acceleration', fields:[
            { id: 'accelType', label: 'Acceleration Mode', val: state.accelType, type: 'select', options:['Off', 'GRAPPA', 'CAIPIRINHA', 'CS'] },
            { id: 'accelR', label: 'Total Factor R', val: state.accelR, type: 'number', readOnly: true },
            { id: 'refScans', label: 'Reference Scans', val: state.refScans, type: 'text' },
            { id: 'accelPE', label: 'Acceleration Factor PE', val: state.accelPE, type: 'number', step: 1 },
            { id: 'refLinesPE', label: 'Reference Lines PE', val: state.refLinesPE, type: 'number', step: 1 },
            { id: 'accel3D', label: 'Acceleration Factor 3D', val: state.accel3D, type: 'number', step: 1 },
            { id: 'refLines3D', label: 'Reference Lines 3D', val: state.refLines3D, type: 'number', step: 1 },
            { id: 'reorderShift3D', label: 'Reordering Shift 3D', val: state.reorderShift3D, type: 'number', step: 1 },
            { id: 'phasePartial', label: 'Phase Partial Fourier %', val: state.phasePartial, type: 'select', options:[100.0, 87.5, 75.0, 62.5] },
            { id: 'slicePartial', label: 'Slice Partial Fourier %', val: state.slicePartial, type: 'select', options:[100.0, 87.5, 75.0, 62.5] },
            { id: 'csFactor', label: 'CS Factor', val: state.csFactor, type: 'range', min: 1.0, max: 10.0, step: 0.5 }
        ]}
    ],
    geometry: [
        { section: 'Geometry', fields:[
            { id: 'slabGroup', label: 'Slab Group', val: state.slabGroup, type: 'text' },
            { id: 'slabs', label: 'Slabs', val: state.slabs, type: 'number' },
            { id: 'slices', label: 'Slices', val: state.slices, type: 'number' },
            { id: 'position', label: 'Position', val: state.position, type: 'text' },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'text' },
            { id: 'phaseEncDir', label: 'Phase Enc Dir', val: state.phaseEncDir, type: 'text' },
            { id: 'phaseOS', label: 'Phase OS %', val: state.phaseOS, type: 'number' },
            { id: 'sliceOS', label: 'Slice OS %', val: state.sliceOS, type: 'number' },
            { id: 'fovRead', label: 'FOV Read mm', val: state.fovRead, type: 'number' },
            { id: 'fovPhasePct', label: 'FOV Phase %', val: state.fovPhasePct, type: 'number' },
            { id: 'sliceThick', label: 'Slice Thick mm', val: state.sliceThick, type: 'number' },
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
            { id: 'conc', label: 'Concatenations', val: state.conc, type: 'number' }
        ]}
    ],
    physio: [
        { section: 'Physio', fields:[
            { id: 'tr', label: 'TR ms', val: state.tr, type: 'number' },
            { label: 'FOV Read / Phase', val: 'Linked', type: 'text', readOnly: true },
            { id: 'phaseResPct', label: 'Phase Resolution %', val: state.phaseResPct, type: 'number' }
        ]}
    ],
    sequence:[
        { section: 'Sequence', fields:[
            { id: 'seqName', label: 'Sequence Name', val: state.seqName, type: 'text' },
            { id: 'dimension', label: 'Dimension', val: state.dimension, type: 'select', options: ['2D', '3D'] },
            { id: 'bw', label: 'Bandwidth Hz/Px', val: state.bw, type: 'number', step: 10 },
            { id: 'echoSpacing', label: 'Echo Spacing ms', val: state.echoSpacing, type: 'number', step: 0.1 },
            { id: 'turboFactor', label: 'Turbo Factor (ETL)', val: state.turboFactor, type: 'number', step: 1 },
            { id: 'echoTrainDuration', label: 'Echo Train Duration ms', val: state.echoTrainDuration, type: 'number', readOnly: true }
        ]}
    ],
    setup: [
        { section: 'Patient Setup', fields:[
            { id: 'region', label: 'Distretto Anatomico', val: state.region, type: 'select', options:['Head', 'Neck', 'Thorax', 'Abdomen', 'Pelvis'] },
            { id: 'patWeight', label: 'Peso (kg)', val: state.patWeight, type: 'number', step: 1 },
            { id: 'patHeight', label: 'Altezza (cm)', val: state.patHeight, type: 'number', step: 1 },
            { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'autoIso()' }
        ]}
    ]
};

// ==========================================
// 3. UI RENDERING & DOM MANAGEMENT
// ==========================================
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
            } else if (f.type === 'range') {
                inp = `<div class="flex items-center gap-2"><input type="range" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" class="w-full accent-blue-500"><span id="val-${f.id}" class="text-xs font-mono text-blue-400 w-6">${val}</span></div>`;
            } else if (f.type === 'button') {
                inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500 outline-none transition-colors">${f.label}</button>`;
            } else {
                inp = `<input type="${f.type}" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} ${f.readOnly ? 'readonly' : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs text-slate-200 ${f.readOnly ? 'text-slate-500' : ''}">`;
            }

            html += `<div class="flex flex-col gap-1 justify-end" data-field="${f.id}">
                ${f.type !== 'button' ? `<label class="text-[10px] uppercase text-slate-400">${f.label}</label>` : ''}${inp}</div>`;
        });
        container.innerHTML += `<div class="mb-6">${html}</div>`;
    });
    
    applyUIConstraints();
}

function switchTab(tabKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'bg-slate-800', 'border-blue-500', 'text-white'));
    const btn = document.querySelector(`[data-target="${tabKey}"]`);
    if(btn) btn.classList.add('active', 'bg-slate-800', 'border-blue-500', 'text-white');
    renderTabContent(tabKey);
}

// UPDATE STATE: Aggiorna solo per ID, evita di ricaricare l'innerHTML, mantieni il Focus
function updateState(key, value) {
    if (typeof value === 'boolean') {
        state[key] = value;
    } else if (isNaN(value) ||['dimension', 'orientation', 'saturation', 'accelType', 'region', 'phasePartial', 'slicePartial'].includes(key)) {
        state[key] = value;
    } else {
        state[key] = parseFloat(value) || 0;
    }
    
    // Sincronizza tutti i cloni dell'input nel DOM (es. se TR è in più tab)
    document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => {
        if(el.type === 'checkbox') el.checked = value;
        else if (el.value != value) el.value = value;
    });
    
    // Aggiorna lo span del range slider se esiste
    if (document.getElementById(`val-${key}`)) {
        document.getElementById(`val-${key}`).innerText = value;
    }
    
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
    
    // Disabilita campi 3D in modalità 2D
    const fields3D =['slabs', 'sliceResPct', 'accel3D', 'refLines3D', 'reorderShift3D', 'slicePartial', 'sliceOS'];
    fields3D.forEach(id => {
        document.querySelectorAll(`[id="inp-${id}"]`).forEach(el => {
            el.disabled = is2D;
            const container = el.closest('[data-field]');
            if(container) container.style.opacity = is2D ? '0.3' : '1';
        });
    });

    // CAIPIRINHA disponibile solo in 3D
    const accelSelect = document.getElementById('inp-accelType');
    if (accelSelect) {
        for(let i=0; i<accelSelect.options.length; i++) {
            if(accelSelect.options[i].value === 'CAIPIRINHA') {
                accelSelect.options[i].disabled = is2D;
                if(is2D && state.accelType === 'CAIPIRINHA') updateState('accelType', 'GRAPPA');
            }
        }
    }

    // Gestione logica CS vs PI (GRAPPA/CAIPIRINHA)
    const csContainer = document.querySelector('[data-field="csFactor"]');
    const peContainer = document.querySelector('[data-field="accelPE"]');
    
    if (csContainer) csContainer.style.display = isCS ? 'flex' : 'none';
    if (peContainer) {
        peContainer.style.opacity = isCS || state.accelType === 'Off' ? '0.3' : '1';
        document.getElementById('inp-accelPE').disabled = isCS || state.accelType === 'Off';
    }
}

// ==========================================
// 4. MOTORE MATEMATICO / FISICO
// ==========================================
function calculatePhysics() {
    const is3D = state.dimension === '3D';
    
    // --- BLOCCO A: Matrice Effettiva e Voxel ---
    const effNy = state.baseRes * (state.fovPhasePct / 100) * (state.phaseResPct / 100) * 
                  (1 + state.phaseOS / 100) * (parseFloat(state.phasePartial) / 100);
                  
    const effNz = is3D ? state.slices * (1 + state.sliceOS / 100) * (parseFloat(state.slicePartial) / 100) : 1;

    const dx = state.fovRead / state.baseRes;
    // dy = FOV_phase / Matrice_phase_ricostruita (semplificato)
    const dy = (state.fovRead * (state.fovPhasePct / 100)) / (state.baseRes * (state.phaseResPct / 100));
    const dz = is3D ? (state.slabs * state.slices * state.sliceThick) / (state.slices * state.slabs) : state.sliceThick;
    
    const Voxel = dx * dy * dz;
    const isIso = Math.abs(dx - dy) < 0.05 && Math.abs(dx - dz) < 0.05;

    // --- BLOCCO B: Accelerazione e g-factor ---
    let R_eff = 1.0;
    let g = 1.0;

    if (state.accelType === 'CS') {
        R_eff = state.csFactor;
        g = 1.0;
    } else if (state.accelType === 'GRAPPA') {
        R_eff = is3D ? state.accelPE * state.accel3D : state.accelPE;
        g = 1.0 + (R_eff - 1) * 0.15;
    } else if (state.accelType === 'CAIPIRINHA' && is3D) {
        R_eff = state.accelPE * state.accel3D;
        g = 1.0 + (R_eff - 1) * 0.05; // Shift riduce il g-factor
    }
    
    if(state.accelType !== 'CS') updateState('accelR', R_eff);

    // --- BLOCCO C: Tempo di Acquisizione (TA) ---
    let shots = 0;
    let TA_sec = 0;
    let maxSlicesPerTR = 1;

    if (is3D) {
        shots = (effNy * effNz) / (state.turboFactor * R_eff);
        TA_sec = (shots * state.tr * state.nex) / 1000;
        TA_sec *= state.slabs;
    } else {
        shots = effNy / (state.turboFactor * R_eff);
        // Calcolo fette interlacciate
        maxSlicesPerTR = Math.floor(state.tr / (state.echoSpacing * state.turboFactor + 20));
        if (maxSlicesPerTR < 1) maxSlicesPerTR = 1;
        const passaggiTR = Math.ceil(state.slices / maxSlicesPerTR);
        TA_sec = (shots * state.tr * state.nex * passaggiTR) / 1000;
    }

    // --- BLOCCO D: SNR Equation ---
    const TermineAcq = (effNy * effNz * state.nex) / (state.bw * 14500);
    const SNR_base = (Voxel / 0.64) * Math.sqrt(TermineAcq) * Math.exp(-state.te / 85) * 3.5;
    
    let SNR_final = SNR_base;
    if (state.accelType === 'CS') {
        // L1 Denoising penalizza meno della radice quadrata di R pura
        SNR_final = (SNR_base / Math.sqrt(state.csFactor)) * 1.2;
    } else if (state.accelType !== 'Off') {
        // Penalità classica SENSE/GRAPPA
        SNR_final = SNR_base / (g * Math.sqrt(R_eff));
    }

    // --- AGGIORNAMENTO UI FOOTER ---
    document.getElementById('out-ta').innerText = `${Math.floor(TA_sec / 60)}:${Math.round(TA_sec % 60).toString().padStart(2, '0')}`;
    
    const totalSlices = is3D ? state.slabs * state.slices : state.slices;
    document.getElementById('out-etl').innerText = `Shots: ${Math.ceil(shots)} / ETL: ${state.turboFactor}`;
    
    document.getElementById('out-gfactor').innerText = `g: ${g.toFixed(2)} / R: ${R_eff.toFixed(1)}`;
    document.getElementById('out-res').innerText = `${dx.toFixed(1)} × ${dy.toFixed(1)} × ${dz.toFixed(1)} mm`;
    
    const isoEl = document.getElementById('out-iso');
    isoEl.innerText = isIso ? 'ISO ✅' : 'ANISO';
    isoEl.className = `font-bold text-[10px] ${isIso ? 'text-green-500' : 'text-yellow-600'}`;

    document.getElementById('out-snr-base').innerText = SNR_base.toFixed(2);
    document.getElementById('out-snr-final').innerText = SNR_final.toFixed(2);
    
    // Echo Train Duration update
    updateState('echoTrainDuration', (state.turboFactor * state.echoSpacing).toFixed(1));

    renderSVGPhantom(SNR_final);
}

// Simulazione grafica per mantenere l'estetica base (richiesta di ignorare i dettagli per ora)
function renderSVGPhantom(snr) {
    const bg = document.getElementById('ph-bg');
    const tissue = document.getElementById('ph-tissue');
    const fluid = document.getElementById('ph-fluid');
    
    if(!bg) return;

    // T1/T2 basic map logic based on TE/TR
    const isT2 = state.te > 60;
    
    if (isT2) {
        tissue.setAttribute('fill', '#444');
        fluid.setAttribute('fill', '#fff');
    } else {
        tissue.setAttribute('fill', '#888');
        fluid.setAttribute('fill', '#222');
    }

    // Noise visualizer
    const filter = state.accelType === 'CS' ? `blur(${Math.max(0, state.csFactor - 2)*0.2}px)` : 'none';
    document.getElementById('phantom-container').style.filter = filter;
}

// ==========================================
// 5. INIZIALIZZAZIONE
// ==========================================
document.addEventListener('DOMContentLoaded', () => { 
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.target));
    });
    switchTab('routine'); 
    calculatePhysics(); 
});
