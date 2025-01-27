/* JavaScript for Interactive Periodic Table */
const periodicTable = document.getElementById('periodic-table');
const searchBar = document.getElementById('search-bar');

const elements = [
    { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, group: 'Nonmetal' },
    { symbol: 'He', name: 'Helium', atomicNumber: 2, group: 'Noble Gas' },
    { symbol: 'Li', name: 'Lithium', atomicNumber: 3, group: 'Alkali Metal' },
    { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, group: 'Alkaline Earth Metal' },
    { symbol: 'B', name: 'Boron', atomicNumber: 5, group: 'Metalloid' },
    { symbol: 'C', name: 'Carbon', atomicNumber: 6, group: 'Nonmetal' },
    { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, group: 'Nonmetal' },
    { symbol: 'O', name: 'Oxygen', atomicNumber: 8, group: 'Nonmetal' },
    { symbol: 'F', name: 'Fluorine', atomicNumber: 9, group: 'Halogen' },
    { symbol: 'Ne', name: 'Neon', atomicNumber: 10, group: 'Noble Gas' },
    { symbol: 'Na', name: 'Sodium', atomicNumber: 11, group: 'Alkali Metal' },
    { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, group: 'Alkaline Earth Metal' },
    { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, group: 'Post-transition Metal' },
    { symbol: 'Si', name: 'Silicon', atomicNumber: 14, group: 'Metalloid' },
    { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, group: 'Nonmetal' },
    { symbol: 'S', name: 'Sulfur', atomicNumber: 16, group: 'Nonmetal' },
    { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, group: 'Halogen' },
    { symbol: 'Ar', name: 'Argon', atomicNumber: 18, group: 'Noble Gas' },
    { symbol: 'K', name: 'Potassium', atomicNumber: 19, group: 'Alkali Metal' },
    { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, group: 'Alkaline Earth Metal' },
    { symbol: 'Sc', name: 'Scandium', atomicNumber: 21, group: 'Transition Metal' },
    { symbol: 'Ti', name: 'Titanium', atomicNumber: 22, group: 'Transition Metal' },
    { symbol: 'V', name: 'Vanadium', atomicNumber: 23, group: 'Transition Metal' },
    { symbol: 'Cr', name: 'Chromium', atomicNumber: 24, group: 'Transition Metal' },
    { symbol: 'Mn', name: 'Manganese', atomicNumber: 25, group: 'Transition Metal' },
    { symbol: 'Fe', name: 'Iron', atomicNumber: 26, group: 'Transition Metal' },
    { symbol: 'Co', name: 'Cobalt', atomicNumber: 27, group: 'Transition Metal' },
    { symbol: 'Ni', name: 'Nickel', atomicNumber: 28, group: 'Transition Metal' },
    { symbol: 'Cu', name: 'Copper', atomicNumber: 29, group: 'Transition Metal' },
    { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, group: 'Transition Metal' },
    { symbol: 'Ga', name: 'Gallium', atomicNumber: 31, group: 'Post-transition Metal' },
    { symbol: 'Ge', name: 'Germanium', atomicNumber: 32, group: 'Metalloid' },
    { symbol: 'As', name: 'Arsenic', atomicNumber: 33, group: 'Metalloid' },
    { symbol: 'Se', name: 'Selenium', atomicNumber: 34, group: 'Nonmetal' },
    { symbol: 'Br', name: 'Bromine', atomicNumber: 35, group: 'Halogen' },
    { symbol: 'Kr', name: 'Krypton', atomicNumber: 36, group: 'Noble Gas' },
    { symbol: 'Rb', name: 'Rubidium', atomicNumber: 37, group: 'Alkali Metal' },    
    { symbol: 'Sr', name: 'Strontium', atomicNumber: 38, group: 'Alkaline Earth Metal' },
    { symbol: 'Y', name: 'Yttrium', atomicNumber: 39, group: 'Transition Metal' },
    { symbol: 'Zr', name: 'Zirconium', atomicNumber: 40, group: 'Transition Metal' },
    { symbol: 'Nb', name: 'Niobium', atomicNumber: 41, group: 'Transition Metal' },
    { symbol: 'Mo', name: 'Molybdenum', atomicNumber: 42, group: 'Transition Metal' },
    { symbol: 'Tc', name: 'Technetium', atomicNumber: 43, group: 'Transition Metal' },
    { symbol: 'Ru', name: 'Ruthenium', atomicNumber: 44, group: 'Transition Metal' },
    { symbol: 'Rh', name: 'Rhodium', atomicNumber: 45, group: 'Transition Metal' },
    { symbol: 'Pd', name: 'Palladium', atomicNumber: 46, group: 'Transition Metal' },
    { symbol: 'Ag', name: 'Silver', atomicNumber: 47, group: 'Transition Metal' },
    { symbol: 'Cd', name: 'Cadmium', atomicNumber: 48, group: 'Transition Metal' },
    { symbol: 'In', name: 'Indium', atomicNumber: 49, group: 'Post-transition Metal' },
    { symbol: 'Sn', name: 'Tin', atomicNumber: 50, group: 'Post-transition Metal' },
    { symbol: 'Sb', name: 'Antimony', atomicNumber: 51, group: 'Metalloid' },
    { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, group: 'Metalloid' },
    { symbol: 'I', name: 'Iodine', atomicNumber: 53, group: 'Halogen' },
    { symbol: 'Xe', name: 'Xenon', atomicNumber: 54, group: 'Noble Gas' },
    { symbol: 'Cs', name: 'Cesium', atomicNumber: 55, group: 'Alkali Metal' },
    { symbol: 'Ba', name: 'Barium', atomicNumber: 56, group: 'Alkaline Earth Metal' },
    { symbol: 'La', name: 'Lanthanum', atomicNumber: 57, group: 'Lanthanide' },
    { symbol: 'Ce', name: 'Cerium', atomicNumber: 58, group: 'Lanthanide' },
    { symbol: 'Pr', name: 'Praseodymium', atomicNumber: 59, group: 'Lanthanide' },
    { symbol: 'Nd', name: 'Neodymium', atomicNumber: 60, group: 'Lanthanide' },
    { symbol: 'Pm', name: 'Promethium', atomicNumber: 61, group: 'Lanthanide' },
    { symbol: 'Sm', name: 'Samarium', atomicNumber: 62, group: 'Lanthanide' },
    { symbol: 'Eu', name: 'Europium', atomicNumber: 63, group: 'Lanthanide' },
    { symbol: 'Gd', name: 'Gadolinium', atomicNumber: 64, group: 'Lanthanide' },
    { symbol: 'Tb', name: 'Terbium', atomicNumber: 65, group: 'Lanthanide' },
    { symbol: 'Dy', name: 'Dysprosium', atomicNumber: 66, group: 'Lanthanide' },
    { symbol: 'Ho', name: 'Holmium', atomicNumber: 67, group: 'Lanthanide' },
    { symbol: 'Er', name: 'Erbium', atomicNumber: 68, group: 'Lanthanide' },
    { symbol: 'Tm', name: 'Thulium', atomicNumber: 69, group: 'Lanthanide' },
    { symbol: 'Yb', name: 'Ytterbium', atomicNumber: 70, group: 'Lanthanide' },
    { symbol: 'Lu', name: 'Lutetium', atomicNumber: 71, group: 'Lanthanide' },
    { symbol: 'Hf', name: 'Hafnium', atomicNumber: 72, group: 'Transition Metal' },
    { symbol: 'Ta', name: 'Tantalum', atomicNumber: 73, group: 'Transition Metal' },
    { symbol: 'W', name: 'Tungsten', atomicNumber: 74, group: 'Transition Metal' },
    { symbol: 'Re', name: 'Rhenium', atomicNumber: 75, group: 'Transition Metal' },
    { symbol: 'Os', name: 'Osmium', atomicNumber: 76, group: 'Transition Metal' },
    { symbol: 'Ir', name: 'Iridium', atomicNumber: 77, group: 'Transition Metal' },
    { symbol: 'Pt', name: 'Platinum', atomicNumber: 78, group: 'Transition Metal' },
    { symbol: 'Au', name: 'Gold', atomicNumber: 79, group: 'Transition Metal' },
    { symbol: 'Hg', name: 'Mercury', atomicNumber: 80, group: 'Transition Metal' },
    { symbol: 'Tl', name: 'Thallium', atomicNumber: 81, group: 'Post-transition Metal' },
    { symbol: 'Pb', name: 'Lead', atomicNumber: 82, group: 'Post-transition Metal' },
    { symbol: 'Bi', name: 'Bismuth', atomicNumber: 83, group: 'Post-transition Metal' },
    { symbol: 'Po', name: 'Polonium', atomicNumber: 84, group: 'Metalloid' },
    { symbol: 'At', name: 'Astatine', atomicNumber: 85, group: 'Metalloid' },
    { symbol: 'Rn', name: 'Radon', atomicNumber: 86, group: 'Noble Gas' },
    { symbol: 'Fr', name: 'Francium', atomicNumber: 87, group: 'Alkali Metal' },
    { symbol: 'Ra', name: 'Radium', atomicNumber: 88, group: 'Alkaline Earth Metal' },
    { symbol: 'Ac', name: 'Actinium', atomicNumber: 89, group: 'Actinide' },
    { symbol: 'Th', name: 'Thorium', atomicNumber: 90, group: 'Actinide' },
    { symbol: 'Pa', name: 'Protactinium', atomicNumber: 91, group: 'Actinide' },
    { symbol: 'U', name: 'Uranium', atomicNumber: 92, group: 'Actinide' },
    { symbol: 'Np', name: 'Neptunium', atomicNumber: 93, group: 'Actinide' },
    { symbol: 'Pu', name: 'Plutonium', atomicNumber: 94, group: 'Actinide' },
    { symbol: 'Am', name: 'Americium', atomicNumber: 95, group: 'Actinide' },
    { symbol: 'Cm', name: 'Curium', atomicNumber: 96, group: 'Actinide' },
    { symbol: 'Bk', name: 'Berkelium', atomicNumber: 97, group: 'Actinide' },
    { symbol: 'Cf', name: 'Californium', atomicNumber: 98, group: 'Actinide' },
    { symbol: 'Es', name: 'Einsteinium', atomicNumber: 99, group: 'Actinide' },
    { symbol: 'Fm', name: 'Fermium', atomicNumber: 100, group: 'Actinide' },
    { symbol: 'Md', name: 'Mendelevium', atomicNumber: 101, group: 'Actinide' },
    { symbol: 'No', name: 'Nobelium', atomicNumber: 102, group: 'Actinide' },
    { symbol: 'Lr', name: 'Lawrencium', atomicNumber: 103, group: 'Actinide' },
    { symbol: 'Rf', name: 'Rutherfordium', atomicNumber: 104, group: 'Transition Metal' },
    { symbol: 'Db', name: 'Dubnium', atomicNumber: 105, group: 'Transition Metal' },
    { symbol: 'Sg', name: 'Seaborgium', atomicNumber: 106, group: 'Transition Metal' },
    { symbol: 'Bh', name: 'Bohrium', atomicNumber: 107, group: 'Transition Metal' },
    { symbol: 'Hs', name: 'Hassium', atomicNumber: 108, group: 'Transition Metal' },
    { symbol: 'Mt', name: 'Meitnerium', atomicNumber: 109, group: 'Unknown' },
    { symbol: 'Ds', name: 'Darmstadtium', atomicNumber: 110, group: 'Unknown' },
    { symbol: 'Rg', name: 'Roentgenium', atomicNumber: 111, group: 'Unknown' },
    { symbol: 'Cn', name: 'Copernicium', atomicNumber: 112, group: 'Transition Metal' },
    { symbol: 'Nh', name: 'Nihonium', atomicNumber: 113, group: 'Unknown' },
    { symbol: 'Fl', name: 'Flerovium', atomicNumber: 114, group: 'Unknown' },
    { symbol: 'Mc', name: 'Moscovium', atomicNumber: 115, group: 'Unknown' },
    { symbol: 'Lv', name: 'Livermorium', atomicNumber: 116, group: 'Unknown' },
    { symbol: 'Ts', name: 'Tennessine', atomicNumber: 117, group: 'Unknown' },
    { symbol: 'Og', name: 'Oganesson', atomicNumber: 118, group: 'Unknown' }
];

function renderTable(filteredElements = elements) {
    periodicTable.innerHTML = '';
    filteredElements.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('element');
        div.textContent = element.symbol;
        div.title = `${element.name}\nAtomic Number: ${element.atomicNumber}\nGroup: ${element.group}`;
        div.addEventListener('click', () => {
            alert(`Element: ${element.name}\nSymbol: ${element.symbol}\nAtomic Number: ${element.atomicNumber}\nGroup: ${element.group}`);
        });
        periodicTable.appendChild(div);
    });
}

searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const filteredElements = elements.filter(el =>
        el.name.toLowerCase().includes(query) ||
        el.symbol.toLowerCase().includes(query) ||
        el.atomicNumber.toString().includes(query)
    );
    renderTable(filteredElements);
});

renderTable();