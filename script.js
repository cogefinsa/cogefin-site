
// Mobile menu
const btn = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
if(btn && menu){ btn.addEventListener('click', ()=> menu.classList.toggle('open')); }

// Simulator coefficients
const cfg = {
  base: { start:190, business:590, scale:1490 },
  perInvoice: 1.20,       // CHF par facture/mois
  perEmployee: 30,        // CHF par employé/mois (payroll)
  options: { tva: 40, reporting: 100, pv_admin: 150 } // CHF/mois
};
function simulate(){
  const inv = +document.getElementById('invoices')?.value || 0;
  const emp = +document.getElementById('employees')?.value || 0;
  const pack = document.getElementById('pack')?.value || 'start';
  const tva = document.getElementById('opt_tva')?.checked || false;
  const rep = document.getElementById('opt_reporting')?.checked || false;
  const pv  = document.getElementById('opt_pv')?.checked || false;
  let total = cfg.base[pack] + inv*cfg.perInvoice + emp*cfg.perEmployee;
  if(tva) total += cfg.options.tva;
  if(rep) total += cfg.options.reporting;
  if(pv)  total += cfg.options.pv_admin;
  const el = document.getElementById('total'); if(el) el.textContent = 'CHF ' + total.toFixed(0) + ' / mois';
}
['invoices','employees','pack','opt_tva','opt_reporting','opt_pv'].forEach(id=>{
  const el = document.getElementById(id); if(el){ el.addEventListener('input', simulate); el.addEventListener('change', simulate); }
});
simulate();

// Contact form success message (formsubmit redirect with ?sent=1)
(function(){
  const params = new URLSearchParams(window.location.search);
  if(params.get('sent')==='1'){
    const box = document.getElementById('sent-box');
    if(box){ box.style.display='block'; }
  }
})();
