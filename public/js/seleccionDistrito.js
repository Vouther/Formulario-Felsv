document.addEventListener('DOMContentLoaded', () => {
// Inicializar dropdowns de Semantic UI
$('.ui.dropdown').dropdown();

const districts = <%- JSON.stringify(districts || []) %>;
const municipalities = <%- JSON.stringify(municipalities || []) %>;
const departments = <%- JSON.stringify(departments || []) %>;

const districtSelect = document.getElementById('district');
const municipalitySelect = document.getElementById('municipality');
const departmentSelect = document.getElementById('department');

function resetSelect(selectEl, placeholderText) {
    selectEl.innerHTML = '';
    const opt = document.createElement('option');
    opt.value = '';
    opt.disabled = true;
    opt.selected = true;
    opt.hidden = true;
    opt.textContent = placeholderText;
    selectEl.appendChild(opt);
    selectEl.disabled = false;

    $(selectEl).dropdown('clear');
    $(selectEl).dropdown('refresh');
}

// Inicializar placeholders
resetSelect(municipalitySelect, 'Seleccionar el distrito');
resetSelect(departmentSelect, 'Seleccionar el distrito');

districtSelect.addEventListener('change', () => {
    const selectedDistrictName = districtSelect.value;

    if (!selectedDistrictName) {
    resetSelect(municipalitySelect, 'Seleccionar el distrito');
    resetSelect(departmentSelect, 'Seleccionar el distrito');
    return;
    }

    const selectedDistrict = districts.find(d => String(d.DISTRITO) === String(selectedDistrictName));

    if (!selectedDistrict) {
    console.warn('Distrito seleccionado no encontrado:', selectedDistrictName);
    resetSelect(municipalitySelect, 'Seleccionar el distrito');
    resetSelect(departmentSelect, 'Seleccionar el distrito');
    return;
    }

    // MUNICIPIO
    const selectedMunicipality = municipalities.find(
    m => String(m.CODIGO).trim() === String(selectedDistrict.CodMuni).trim() && String(m.DEPTO).trim() === String(selectedDistrict.CodDepto).trim()
    );

    if (!selectedMunicipality) {
    resetSelect(municipalitySelect, 'No encontrado');
    } else {
    municipalitySelect.innerHTML = '';
    const muniOption = document.createElement('option');
    muniOption.value = selectedMunicipality.CODIGO;
    muniOption.textContent = selectedMunicipality.VALORES || selectedMunicipality.CODIGO;
    muniOption.selected = true;
    municipalitySelect.appendChild(muniOption);
    municipalitySelect.disabled = true;

    $(municipalitySelect).dropdown('clear');
    $(municipalitySelect).dropdown('refresh');
    }

    // DEPARTAMENTO
    const selectedDepartment = departments.find(
    dep => String(dep.CODIGO).trim() === String(selectedDistrict.CodDepto).trim()
    );

    if (!selectedDepartment) {
    resetSelect(departmentSelect, 'No encontrado');
    } else {
    departmentSelect.innerHTML = '';
    const deptOption = document.createElement('option');
    deptOption.value = selectedDepartment.CODIGO;
    deptOption.textContent = selectedDepartment.VALORES || selectedDepartment.CODIGO;
    deptOption.selected = true;
    departmentSelect.appendChild(deptOption);
    departmentSelect.disabled = true;

    $(departmentSelect).dropdown('clear');
    $(departmentSelect).dropdown('refresh');
    }
});
});