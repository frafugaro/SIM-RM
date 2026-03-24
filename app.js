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

function getSignalIntensity(t1, t2, pd = 1.0, overrideTR = null, overrideTE = null, isFat = false) {
    if (state.saturation === 'Fat Sat' && isFat) return `rgb(10, 10, 10)`;
    if (state.saturation === 'Water Sat' && !isFat) return `rgb(10, 10, 10)`;

    const effTR = overrideTR !== null ? overrideTR : state.tr;
    const effTE = overrideTE !== null ? overrideTE : state.te;
    const signal = pd * (1 - Math.exp(-effTR / t1)) * Math.exp(-effTE / t2);
    const gray = Math.min(255, Math.max(10, Math.round(signal * 850)));
    return `rgb(${gray}, ${gray}, ${gray})`;
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
    const sar = (0.002 * state.turboFactor * (weight / Math.pow(height/100, 2)) / (state.tr / 1000)) * Math.pow(state.flipAngle / 180, 2);

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

    updatePhantom(snrFinal, bwHzPx);
}

function updatePhantom(snrFinal, bwHzPx) {
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
        'pelvis-axial': 'Axial Pelvis/Prostate',
        'pelvis-coronal': 'Coronal Pelvis',
        'pelvis-sagittal': 'Sagittal Pelvis',
        'thorax-axial': 'Axial Thorax', 
        'thorax-sagittal': 'Sagittal Thorax',
        'head-axial': 'Axial Brain',
        'head-sagittal': 'Sagittal Brain'
    };
    document.getElementById('phantom-title').innerText = titles[viewId] || titles[state.region];

    if (state.region === 'abdomen') {
        const colors = {
            liver: getSignalIntensity(1200, 160, 0.85, null, null, false), 
            spleen: getSignalIntensity(1000, 120, 0.90, null, null, false),
            kidney_cortex: getSignalIntensity(1100, 130, 0.90, null, null, false),
            kidney_medulla: getSignalIntensity(1100, 130, 0.90, null, null, false), 
            muscle: getSignalIntensity(900, 50, 0.80, null, null, false),
            fat: getSignalIntensity(250, 80, 1.0, null, null, true),
            spine: getSignalIntensity(300, 60, 0.80, null, null, false)
        };
        
        document.getElementById('ph-abd-ax-liver')?.setAttribute('fill', colors.liver);
        document.getElementById('ph-abd-ax-spleen')?.setAttribute('fill', colors.spleen);
        document.getElementById('ph-abd-ax-kidney-r-cortex')?.setAttribute('fill', colors.kidney_cortex);
        document.getElementById('ph-abd-ax-kidney-r-medulla')?.setAttribute('fill', colors.kidney_medulla);
        document.getElementById('ph-abd-ax-kidney-l-cortex')?.setAttribute('fill', colors.kidney_cortex);
        document.getElementById('ph-abd-ax-kidney-l-medulla')?.setAttribute('fill', colors.kidney_medulla);
        document.getElementById('ph-abd-ax-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-abd-ax-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-abd-ax-spine')?.setAttribute('fill', colors.spine);

        document.getElementById('ph-abd-cor-liver')?.setAttribute('fill', colors.liver);
        document.getElementById('ph-abd-cor-spleen')?.setAttribute('fill', colors.spleen);
        document.getElementById('ph-abd-cor-kidney-r-cortex')?.setAttribute('fill', colors.kidney_cortex);
        document.getElementById('ph-abd-cor-kidney-r-medulla')?.setAttribute('fill', colors.kidney_medulla);
        document.getElementById('ph-abd-cor-kidney-l-cortex')?.setAttribute('fill', colors.kidney_cortex);
        document.getElementById('ph-abd-cor-kidney-l-medulla')?.setAttribute('fill', colors.kidney_medulla);
        document.getElementById('ph-abd-cor-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-abd-cor-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-abd-cor-spine')?.setAttribute('fill', colors.spine);

        document.getElementById('ph-abd-sag-liver')?.setAttribute('fill', colors.liver);
        document.getElementById('ph-abd-sag-kidney-cortex')?.setAttribute('fill', colors.kidney_cortex);
        document.getElementById('ph-abd-sag-kidney-medulla')?.setAttribute('fill', colors.kidney_medulla);
        document.getElementById('ph-abd-sag-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-abd-sag-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-abd-sag-spine')?.setAttribute('fill', colors.spine);

        if(document.getElementById('leg-abd-liver')) document.getElementById('leg-abd-liver').style.backgroundColor = colors.liver;
        if(document.getElementById('leg-abd-spleen')) document.getElementById('leg-abd-spleen').style.backgroundColor = colors.spleen;
        if(document.getElementById('leg-abd-kidney')) document.getElementById('leg-abd-kidney').style.backgroundColor = colors.kidney_cortex;
        if(document.getElementById('leg-abd-fat')) document.getElementById('leg-abd-fat').style.backgroundColor = colors.fat;
    } 
    else if (state.region === 'pelvis') {
        const colors = {
            prostate_pz: getSignalIntensity(1200, 130, 0.9, null, null, false),
            prostate_tz: getSignalIntensity(1000, 80, 0.8, null, null, false),
            prostate_capsule: getSignalIntensity(800, 50, 0.7, null, null, false),
            bladder: getSignalIntensity(3000, 1000, 1.0, null, null, false),
            muscle: getSignalIntensity(900, 50, 0.8, null, null, false),
            fat: getSignalIntensity(250, 80, 1.0, null, null, true),
            bone_cortical: getSignalIntensity(2000, 10, 0.1, null, null, false),
            bone_marrow: getSignalIntensity(350, 60, 1.0, null, null, true), 
            rectum: getSignalIntensity(800, 50, 0.5, null, null, false),
            sv: getSignalIntensity(1500, 150, 0.9, null, null, false),
            penis: getSignalIntensity(900, 60, 0.8, null, null, false)
        };

        document.getElementById('ph-pelvis-ax-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-pelvis-ax-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-pelvis-ax-bone-l')?.setAttribute('fill', colors.bone_cortical);
        document.getElementById('ph-pelvis-ax-bone-r')?.setAttribute('fill', colors.bone_cortical);
        document.getElementById('ph-pelvis-ax-rectum')?.setAttribute('fill', colors.rectum);
        document.getElementById('ph-pelvis-ax-bladder')?.setAttribute('fill', colors.bladder);
        document.getElementById('ph-pelvis-ax-prostate-pz')?.setAttribute('fill', colors.prostate_pz);
        document.getElementById('ph-pelvis-ax-prostate-tz')?.setAttribute('fill', colors.prostate_tz);
        document.getElementById('ph-pelvis-ax-prostate-capsule')?.setAttribute('fill', colors.prostate_capsule);

        document.getElementById('ph-pelvis-cor-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-pelvis-cor-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-pelvis-cor-bone-l')?.setAttribute('fill', colors.bone_cortical);
        document.getElementById('ph-pelvis-cor-bone-r')?.setAttribute('fill', colors.bone_cortical);
        document.getElementById('ph-pelvis-cor-bladder')?.setAttribute('fill', colors.bladder);
        document.getElementById('ph-pelvis-cor-sv')?.setAttribute('fill', colors.sv);
        document.getElementById('ph-pelvis-cor-prostate-pz')?.setAttribute('fill', colors.prostate_pz);
        document.getElementById('ph-pelvis-cor-prostate-tz')?.setAttribute('fill', colors.prostate_tz);
        document.getElementById('ph-pelvis-cor-prostate-capsule')?.setAttribute('fill', colors.prostate_capsule);

        document.getElementById('ph-pelvis-sag-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-pelvis-sag-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-pelvis-sag-spine')?.setAttribute('fill', colors.bone_cortical);
        document.getElementById('ph-pelvis-sag-bladder')?.setAttribute('fill', colors.bladder);
        document.getElementById('ph-pelvis-sag-rectum')?.setAttribute('fill', colors.rectum);
        document.getElementById('ph-pelvis-sag-prostate-pz')?.setAttribute('fill', colors.prostate_pz);
        document.getElementById('ph-pelvis-sag-prostate-tz')?.setAttribute('fill', colors.prostate_tz);
        document.getElementById('ph-pelvis-sag-prostate-capsule')?.setAttribute('fill', colors.prostate_capsule);
        document.getElementById('ph-pelvis-sag-penis')?.setAttribute('fill', colors.penis);
        document.getElementById('ph-pelvis-sag-symphysis')?.setAttribute('fill', colors.bone_cortical);

        if(document.getElementById('leg-pelvis-pz')) document.getElementById('leg-pelvis-pz').style.backgroundColor = colors.prostate_pz;
        if(document.getElementById('leg-pelvis-tz')) document.getElementById('leg-pelvis-tz').style.backgroundColor = colors.prostate_tz;
        if(document.getElementById('leg-pelvis-bladder')) document.getElementById('leg-pelvis-bladder').style.backgroundColor = colors.bladder;
        if(document.getElementById('leg-pelvis-muscle')) document.getElementById('leg-pelvis-muscle').style.backgroundColor = colors.muscle;
        if(document.getElementById('leg-pelvis-bone')) document.getElementById('leg-pelvis-bone').style.backgroundColor = colors.bone_cortical;
        if(document.getElementById('leg-pelvis-fat')) document.getElementById('leg-pelvis-fat').style.backgroundColor = colors.fat;
    }
    else if (state.region === 'thorax') {
        const colors = {
            lung: getSignalIntensity(1200, 30, 0.2, null, null, false),
            heart_muscle: getSignalIntensity(900, 50, 0.8, null, null, false),
            blood: getSignalIntensity(1200, 50, 0.9, null, null, false), // Dark blood effect
            muscle: getSignalIntensity(900, 50, 0.8, null, null, false),
            fat: getSignalIntensity(250, 80, 1.0, null, null, true),
            spine: getSignalIntensity(300, 60, 0.8, null, null, false)
        };
        
        document.getElementById('ph-tho-ax-lung-r')?.setAttribute('fill', colors.lung);
        document.getElementById('ph-tho-ax-lung-l')?.setAttribute('fill', colors.lung);
        document.getElementById('ph-tho-ax-heart')?.setAttribute('fill', colors.heart_muscle);
        document.getElementById('ph-tho-ax-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-tho-ax-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-tho-ax-spine')?.setAttribute('fill', colors.spine);

        document.getElementById('ph-tho-sag-lung')?.setAttribute('fill', colors.lung);
        document.getElementById('ph-tho-sag-heart')?.setAttribute('fill', colors.heart_muscle);
        document.getElementById('ph-tho-sag-muscle')?.setAttribute('fill', colors.muscle);
        document.getElementById('ph-tho-sag-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-tho-sag-spine')?.setAttribute('fill', colors.spine);
        document.getElementById('ph-tho-sag-sternum')?.setAttribute('fill', colors.spine);

        if(document.getElementById('leg-tho-lung')) document.getElementById('leg-tho-lung').style.backgroundColor = colors.lung;
        if(document.getElementById('leg-tho-heart')) document.getElementById('leg-tho-heart').style.backgroundColor = colors.heart_muscle;
        if(document.getElementById('leg-tho-muscle')) document.getElementById('leg-tho-muscle').style.backgroundColor = colors.muscle;
        if(document.getElementById('leg-tho-fat')) document.getElementById('leg-tho-fat').style.backgroundColor = colors.fat;
    }
    else if (state.region === 'head') {
        const isT1 = state.orientation === 'Sagittal';
        const overrideTR = isT1 ? 500 : null;
        const overrideTE = isT1 ? 15 : null;

        const colors = {
            csf: getSignalIntensity(4000, 2000, 1.0, overrideTR, overrideTE, false),
            gm: getSignalIntensity(1200, 100, 0.85, overrideTR, overrideTE, false),
            wm: getSignalIntensity(600, 80, 0.75, overrideTR, overrideTE, false),
            fat: getSignalIntensity(250, 80, 1.0, overrideTR, overrideTE, true),
            bone: getSignalIntensity(2000, 10, 0.1, overrideTR, overrideTE, false)
        };

        document.getElementById('ph-hd-ax-csf')?.setAttribute('fill', colors.csf);
        document.getElementById('ph-hd-ax-gm')?.setAttribute('fill', colors.gm);
        document.getElementById('ph-hd-ax-wm')?.setAttribute('fill', colors.wm);
        document.getElementById('ph-hd-ax-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-hd-ax-bone')?.setAttribute('fill', colors.bone);
        document.getElementById('ph-hd-ax-ventricles')?.setAttribute('fill', colors.csf);
        document.getElementById('ph-hd-ax-nuclei')?.setAttribute('fill', colors.gm);

        document.getElementById('ph-hd-sag-csf')?.setAttribute('fill', colors.csf);
        document.getElementById('ph-hd-sag-gm')?.setAttribute('fill', colors.gm);
        document.getElementById('ph-hd-sag-wm')?.setAttribute('fill', colors.wm);
        document.getElementById('ph-hd-sag-fat')?.setAttribute('fill', colors.fat);
        document.getElementById('ph-hd-sag-bone')?.setAttribute('fill', colors.bone);
        document.getElementById('ph-hd-sag-cc')?.setAttribute('fill', colors.wm);
        document.getElementById('ph-hd-sag-ventricle')?.setAttribute('fill', colors.csf);
        document.getElementById('ph-hd-sag-brainstem')?.setAttribute('fill', colors.wm);
        document.getElementById('ph-hd-sag-cerebellum')?.setAttribute('fill', colors.gm);

        if(document.getElementById('leg-hd-csf')) document.getElementById('leg-hd-csf').style.backgroundColor = colors.csf;
        if(document.getElementById('leg-hd-gm')) document.getElementById('leg-hd-gm').style.backgroundColor = colors.gm;
        if(document.getElementById('leg-hd-wm')) document.getElementById('leg-hd-wm').style.backgroundColor = colors.wm;
        if(document.getElementById('leg-hd-cc')) document.getElementById('leg-hd-cc').style.backgroundColor = colors.wm;
    }

    const baseNoise = Math.max(0, (1.0 - snrFinal) * 0.3);
    const gFactor = (state.accelType === 'GRAPPA' || state.accelType === 'CAIPIRINHA') && state.accelR > 2.0 ? (state.accelR - 2.0) * 0.15 * state.gFactor : 0;
    
    document.getElementById('ph-noise').setAttribute('opacity', baseNoise);
    document.getElementById('ph-noise-gfactor').setAttribute('opacity', gFactor);

    let filterStr = 'grayscale(100%) ';
    if (state.accelType === 'CS') filterStr += `blur(${(state.csFactor - 1) * 0.3}px) contrast(110%)`;
    document.getElementById('phantom-container').style.filter = filterStr;

    const shiftPx = bwHzPx < 100 ? 3 : (bwHzPx <= 250 ? 1 : 0);
    document.querySelectorAll('.transform-water').forEach(el => {
        el.style.transform = `translateX(${shiftPx}px)`;
        el.style.filter = shiftPx > 0 ? `drop-shadow(-${shiftPx}px 0px 0px rgba(0,0,0,1))` : '';
    });
}

document.addEventListener('DOMContentLoaded', () => { switchTab('routine'); calculatePhysics(); });
