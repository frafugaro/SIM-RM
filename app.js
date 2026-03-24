const API_URL = "https://mri-physics-core.onrender.com/calculate";

const state = {
    orientation: 'Transversal',
    tr: 2200.0, te: 105.0, slices: 60, fovRead: 220.0, fovPhasePct: 100.0,
    sliceThick: 1.0, nex: 1.8, conc: 1, bw: 521.0, echoSpacing: 4.4, dimension: '3D',
    baseRes: 320, phaseResPct: 91.0, sliceResPct: 81.0, interp: 1,
    phaseOS: 30.0, sliceOS: 5.0, phasePartial: 100.0, slicePartial: 100.0,
    turboFactor: 64, accelR: 4.0, gFactor: 1.0, accelType: 'GRAPPA', csFactor: 2.0,
    flipAngle: 135.0, saturation: 'Nessuna',
    region: 'abdomen'
};

const config = {
    routine:[
        { section: 'Routine Settings', fields:[
            { id: 'slices', label: 'Slices', val: state.slices, type: 'number', step: 2 },
            { id: 'orientation', label: 'Orientation', val: state.orientation, type: 'select', options:['Transversal', 'Coronal', 'Sagittal'] },
            { id: 'phaseOS', label: 'Phase OS (%)', val: state.phaseOS, type: 'number', step: 10 },
            { id: 'sliceOS', label: 'Slice OS (%)', val: state.sliceOS, type: 'number', step: 5 },
            { id: 'fovRead', label: 'FOV Read (mm)', val: state.fovRead, type: 'number', step: 10 },
            { id: 'fovPhasePct', label: 'FOV Phase (%)', val: state.fovPhasePct, type: 'number', step: 5 },
            { id: 'autoIsoBtn', label: 'AUTO ISO', val: 'AUTO ISO', type: 'button', action: 'autoIso()' },
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
    ]
};

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

document.getElementById('quick-search').addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const resContainer = document.getElementById('search-results');
    resContainer.innerHTML = '';
    if (query.length < 2) { resContainer.classList.add('hidden'); return; }
    
    Object.keys(config).forEach(tabKey => {
        config[tabKey].forEach(section => {
            section.fields.forEach(field => {
                if (field.label.toLowerCase().includes(query)) {
                    const div = document.createElement('div');
                    div.className = 'px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer border-b border-slate-800';
                    div.innerText = `${field.label} - Tab: ${tabKey.toUpperCase()}`;
                    div.onclick = () => {
                        switchTab(tabKey);
                        setTimeout(() => {
                            const el = document.getElementById(`inp-${field.id}`);
                            if(el) { el.focus(); el.classList.add('ring-2', 'ring-blue-400'); setTimeout(()=>el.classList.remove('ring-2'), 2000); }
                        }, 50);
                        resContainer.classList.add('hidden');
                        document.getElementById('quick-search').value = '';
                    };
                    resContainer.appendChild(div);
                }
            });
        });
    });
    resContainer.classList.remove('hidden');
    resContainer.classList.add('flex');
});

function autoIso() {
    const dx = state.fovRead / state.baseRes;
    state.sliceThick = parseFloat(dx.toFixed(2));
    state.phaseResPct = 100;
    state.sliceResPct = 100;
    state.fovPhasePct = 100;
    document.querySelectorAll(`[id="inp-sliceThick"]`).forEach(el => el.value = state.sliceThick);
    document.querySelectorAll(`[id="inp-phaseResPct"]`).forEach(el => el.value = 100);
    document.querySelectorAll(`[id="inp-sliceResPct"]`).forEach(el => el.value = 100);
    document.querySelectorAll(`[id="inp-fovPhasePct"]`).forEach(el => el.value = 100);
    calculatePhysics();
}

function renderTabContent(tabKey) {
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
                inp = `<select id="inp-${f.id}" onchange="updateState('${f.id}', this.value)" class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 text-xs" ${disabled}>
                    ${f.options.map(o => `<option value="${o}" ${val == o ? 'selected' : ''} ${f.id==='accelType'&&o==='CAIPIRINHA'&&is2D?'disabled':''}>${o}</option>`).join('')}</select>`;
            } else if (f.type === 'range') {
                inp = `<div class="flex items-center gap-2"><input type="range" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" min="${f.min}" max="${f.max}" step="${f.step}" value="${val}" class="w-full accent-blue-500" ${disabled}><span id="val-${f.id}" class="text-xs font-mono text-blue-400">${val}x</span></div>`;
            } else if (f.type === 'button') {
                inp = `<button onclick="${f.action}" class="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-1.5 rounded text-xs border border-blue-500">${f.label}</button>`;
            } else {
                inp = `<input type="${f.type}" id="inp-${f.id}" oninput="updateState('${f.id}', this.value)" value="${val}" ${f.step ? `step="${f.step}"` : ''} class="w-full bg-slate-900 border border-slate-700 rounded p-1.5 focus:border-blue-500 font-mono text-xs" ${disabled}>`;
            }

            html += `<div class="flex flex-col gap-1 transition-opacity justify-end" style="${opacity} ${display}">
                ${f.type !== 'button' ? `<label class="text-[10px] uppercase text-slate-400">${f.label}</label>` : ''}${inp}</div>`;
        });
        container.innerHTML += `<div class="mb-6">${html}</div></div>`;
    });
}

function switchTab(tabKey) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active', 'bg-slate-800', 'border-blue-500', 'text-white'));
    const btn = document.querySelector(`[data-target="${tabKey}"]`);
    if(btn) btn.classList.add('active', 'bg-slate-800', 'border-blue-500', 'text-white');
    renderTabContent(tabKey);
}

function updateState(key, value) {
    if (['dimension', 'orientation', 'saturation', 'accelType'].includes(key)) state[key] = value;
    else state[key] = parseFloat(value) || 0;
    
    document.querySelectorAll(`[id="inp-${key}"]`).forEach(el => el.value = value);
    if(document.getElementById(`val-${key}`)) document.getElementById(`val-${key}`).innerText = value + (key==='csFactor'?'x':'');
    
    calculatePhysics();
    renderTabContent(document.querySelector('.tab-btn.active').dataset.target); 
}

function changeRegion(val) {
    state.region = val;
    calculatePhysics();
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => switchTab(e.target.dataset.target));
});
document.getElementById('pat-weight').addEventListener('input', calculatePhysics);
document.getElementById('pat-height').addEventListener('input', calculatePhysics);

// ==========================================
// CORE PHYSICS LOGIC & API FETCH
// ==========================================

async function fetchSignalFromJava(t1, t2, pd, tr, te, isFat) {
    // SATURATION LOGIC UI -> Engine (Forza spegnimento segnale)
    if (state.saturation === 'Fat Sat' && isFat) return `rgb(10, 10, 10)`;
    if (state.saturation === 'Water Sat' && !isFat) return `rgb(10, 10, 10)`;

    try {
        // Chiamata REST all'API ospitata su Render
        const url = `${API_URL}?pd=${pd}&t1=${t1}&t2=${t2}&tr=${tr}&te=${te}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("API call failed");
        const data = await response.json();
        
        // Estrazione Magnitudine Segnale
        const signal = data.Signal;
        
        // Mapping visivo per la UI con moltiplicatore dinamico
        const gray = Math.min(255, Math.max(10, Math.round(signal * 850)));
        return `rgb(${gray}, ${gray}, ${gray})`;
    } catch (err) {
        // Fallback locale equazione di Bloch se il backend Java non risponde
        const signal = pd * (1 - Math.exp(-tr / t1)) * Math.exp(-te / t2);
        const gray = Math.min(255, Math.max(10, Math.round(signal * 850)));
        return `rgb(${gray}, ${gray}, ${gray})`;
    }
}

async function calculatePhysics() {
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

    const weight = parseFloat(document.getElementById('pat-weight').value) || 75;
    const height = parseFloat(document.getElementById('pat-height').value) || 175;
    const bmi = weight / Math.pow(height/100, 2);
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

    // Dashboard Update
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

// RENDERING ASINCRONO SVG PHANTOM (MULTIPLE FETCHES)
async function renderSVGPhantom(snrFinal, bwHzPx) {
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

    document.getElementById(`ph-group-${viewId}`).classList.remove('hidden');
    document.getElementById(`legend-${legendId}`).classList.remove('hidden');

    const titles = { 
        'abdomen-axial': 'Axial Abdomen', 
        'abdomen-coronal': 'Coronal Abdomen', 
        'abdomen-sagittal': 'Sagittal Abdomen', 
        'pelvis-axial': 'Axial Pelvis/Prostate',
        'pelvis-coronal': 'Coronal Pelvis',
        'pelvis-sagittal': 'Sagittal Pelvis',
        'thorax-axial': 'Axial Thorax', 
        'thorax-sagittal': 'Sagittal Thorax',
        'head-axial': 'Axial Brain',
        'head-sagittal': 'Sagittal Brain'
    };
    document.getElementById('phantom-title').innerText = titles[viewId] || titles[state.region];

    // --- CALCOLO COLORI (FETCH PARALLELI) ---
    if (state.region === 'abdomen') {
        const[c_liver, c_spleen, c_kidney_c, c_kidney_m, c_muscle, c_fat, c_spine] = await Promise.all([
            fetchSignalFromJava(810, 42, 0.85, state.tr, state.te, false),
            fetchSignalFromJava(1000, 80, 0.90, state.tr, state.te, false),
            fetchSignalFromJava(1100, 95, 0.90, state.tr, state.te, false),
            fetchSignalFromJava(1100, 130, 0.95, state.tr, state.te, false),
            fetchSignalFromJava(900, 50, 0.80, state.tr, state.te, false),
            fetchSignalFromJava(250, 80, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(300, 60, 0.80, state.tr, state.te, false)
        ]);
        
        document.querySelectorAll('[id$="-liver"]').forEach(el => el.setAttribute('fill', c_liver));
        document.querySelectorAll('[id$="-spleen"]').forEach(el => el.setAttribute('fill', c_spleen));
        document.querySelectorAll('[id$="-kidney-cortex"]').forEach(el => el.setAttribute('fill', c_kidney_c));
        document.querySelectorAll('[id$="-kidney-r-cortex"]').forEach(el => el.setAttribute('fill', c_kidney_c));
        document.querySelectorAll('[id$="-kidney-l-cortex"]').forEach(el => el.setAttribute('fill', c_kidney_c));
        document.querySelectorAll('[id$="-kidney-medulla"]').forEach(el => el.setAttribute('fill', c_kidney_m));
        document.querySelectorAll('[id$="-kidney-r-medulla"]').forEach(el => el.setAttribute('fill', c_kidney_m));
        document.querySelectorAll('[id$="-kidney-l-medulla"]').forEach(el => el.setAttribute('fill', c_kidney_m));
        document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
        document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
        document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_spine));

        document.getElementById('leg-abd-liver').style.backgroundColor = c_liver;
        document.getElementById('leg-abd-spleen').style.backgroundColor = c_spleen;
        document.getElementById('leg-abd-kidney').style.backgroundColor = c_kidney_c;
        document.getElementById('leg-abd-fat').style.backgroundColor = c_fat;
    } 
    else if (state.region === 'pelvis') {
        let t1pz = 1200, t2pz = 130, pdPz = 0.9;
        let t1tz = 1000, t2tz = 80, pdTz = 0.8;
        
        // Dinamica Edema Prostatico T2
        if (state.te >= 100) {
            const edemaFactor = Math.min(2.0, 1.0 + ((state.te - 100) / 100)); 
            t2pz = 180; pdPz = 0.9 * edemaFactor;
            t2tz = 100; pdTz = 0.8 * edemaFactor;
        }

        const[c_pz, c_tz, c_bladder, c_muscle, c_fat, c_bone, c_rectum] = await Promise.all([
            fetchSignalFromJava(t1pz, t2pz, pdPz, state.tr, state.te, false),
            fetchSignalFromJava(t1tz, t2tz, pdTz, state.tr, state.te, false),
            fetchSignalFromJava(3000, 1000, 1.0, state.tr, state.te, false),
            fetchSignalFromJava(900, 50, 0.8, state.tr, state.te, false),
            fetchSignalFromJava(250, 80, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(2000, 10, 0.1, state.tr, state.te, false),
            fetchSignalFromJava(800, 50, 0.5, state.tr, state.te, false)
        ]);

        document.querySelectorAll('[id$="-prostate-pz"]').forEach(el => el.setAttribute('fill', c_pz));
        document.querySelectorAll('[id$="-prostate-tz"]').forEach(el => el.setAttribute('fill', c_tz));
        document.querySelectorAll('[id$="-bladder"]').forEach(el => el.setAttribute('fill', c_bladder));
        document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
        document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
        document.querySelectorAll('[id*="-bone"]').forEach(el => el.setAttribute('fill', c_bone));
        document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_bone));
        document.querySelectorAll('[id$="-rectum"]').forEach(el => el.setAttribute('fill', c_rectum));

        document.getElementById('leg-pelvis-pz').style.backgroundColor = c_pz;
        document.getElementById('leg-pelvis-tz').style.backgroundColor = c_tz;
        document.getElementById('leg-pelvis-bladder').style.backgroundColor = c_bladder;
        document.getElementById('leg-pelvis-fat').style.backgroundColor = c_fat;
    }
    else if (state.region === 'thorax') {
        const[c_lung, c_heart, c_blood, c_muscle, c_fat, c_spine] = await Promise.all([
            fetchSignalFromJava(1200, 30, 0.2, state.tr, state.te, false),
            fetchSignalFromJava(900, 50, 0.8, state.tr, state.te, false),
            fetchSignalFromJava(1200, 50, 0.9, state.tr, state.te, false), // Dark blood SE
            fetchSignalFromJava(900, 50, 0.8, state.tr, state.te, false),
            fetchSignalFromJava(250, 80, 1.0, state.tr, state.te, true),
            fetchSignalFromJava(300, 60, 0.8, state.tr, state.te, false)
        ]);
        
        document.querySelectorAll('[id*="-lung"]').forEach(el => el.setAttribute('fill', c_lung));
        document.querySelectorAll('[id$="-heart"]').forEach(el => el.setAttribute('fill', c_heart));
        document.querySelectorAll('[id$="-aorta"]').forEach(el => el.setAttribute('fill', c_blood));
        document.querySelectorAll('[id$="-muscle"]').forEach(el => el.setAttribute('fill', c_muscle));
        document.querySelectorAll('[id$="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
        document.querySelectorAll('[id$="-spine"]').forEach(el => el.setAttribute('fill', c_spine));
        document.querySelectorAll('[id$="-sternum"]').forEach(el => el.setAttribute('fill', c_spine));

        document.getElementById('leg-tho-lung').style.backgroundColor = c_lung;
        document.getElementById('leg-tho-heart').style.backgroundColor = c_heart;
        document.getElementById('leg-tho-blood').style.backgroundColor = c_blood;
        document.getElementById('leg-tho-fat').style.backgroundColor = c_fat;
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

        document.querySelectorAll('[id*="-csf"]').forEach(el => el.setAttribute('fill', c_csf));
        document.querySelectorAll('[id*="-ventricle"]').forEach(el => el.setAttribute('fill', c_csf));
        document.querySelectorAll('[id*="-gm"]').forEach(el => el.setAttribute('fill', c_gm));
        document.querySelectorAll('[id*="-wm"]').forEach(el => el.setAttribute('fill', c_wm));
        document.querySelectorAll('[id*="-cc"]').forEach(el => el.setAttribute('fill', c_wm));
        document.querySelectorAll('[id*="-fat"]').forEach(el => el.setAttribute('fill', c_fat));
        document.querySelectorAll('[id*="-bone"]').forEach(el => el.setAttribute('fill', c_bone));

        document.getElementById('leg-hd-csf').style.backgroundColor = c_csf;
        document.getElementById('leg-hd-gm').style.backgroundColor = c_gm;
        document.getElementById('leg-hd-wm').style.backgroundColor = c_wm;
        document.getElementById('leg-hd-bone').style.backgroundColor = c_bone;
    }

    // Gestione Rumore
    let baseNoise = Math.max(0, (1.0 - snrFinal) * 0.3);
    let gFactor = (state.accelType === 'GRAPPA' || state.accelType === 'CAIPIRINHA') && state.accelR > 2.0 ? (state.accelR - 2.0) * 0.15 * state.gFactor : 0;
    
    document.getElementById('ph-noise').setAttribute('opacity', baseNoise);
    document.getElementById('ph-noise-gfactor').setAttribute('opacity', gFactor);

    // Compressed Sensing
    let filterStr = 'grayscale(100%) ';
    if (state.accelType === 'CS') filterStr += `blur(${(state.csFactor - 1) * 0.3}px) contrast(110%)`;
    document.getElementById('phantom-container').style.filter = filterStr;

    // Shift Chimico
    const shiftPx = bwHzPx < 100 ? 3 : (bwHzPx <= 250 ? 1 : 0);
    document.querySelectorAll('.transform-water').forEach(el => {
        el.style.transform = `translateX(${shiftPx}px)`;
        el.style.filter = shiftPx > 0 ? `drop-shadow(-${shiftPx}px 0px 0px rgba(0,0,0,1))` : '';
    });
}

document.addEventListener('DOMContentLoaded', () => { switchTab('routine'); calculatePhysics(); });
