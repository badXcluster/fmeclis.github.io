function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function round2(num) {
  return Math.round(num * 100) / 100;
}

function calculateDays(startDateStr) {
  const startDate = new Date(startDateStr);
  const now = new Date();
  const diffTime = now - startDate;
  return diffTime / (1000 * 3600 * 24);
}

const gasConfig = {
  prefix: "gas",
  firstDateStr: "2024-10-01",
  firstReading: 12345.67,
  lastReading: 13567.89,
  unitPrice: 6.54
};

const elecConfig = {
  prefix: "elec",
  firstDateStr: "2024-10-01",
  firstReading: 24567.890,
  lastReading: 25789.234,
  unitPrice: 1.73
};

const waterConfig = {
  prefix: "water",
  firstDateStr: "2024-10-01",
  firstReading: 345.67,
  lastReading: 389.12,
  unitPrice: 23.54
};

function updateProgress(prefix, value, limit) {
  const percent = Math.min((value / limit) * 100, 100);
  const bar = document.getElementById(`${prefix}_progressBar`);
  const label = document.getElementById(`${prefix}_progressLabel`);
  const note = document.getElementById(`${prefix}_progressNote`);
  if (bar && label) {
    bar.style.width = percent + "%";
    label.textContent = round2(percent) + "%";
  }
  if (note) note.textContent = "Limit: " + limit;
}

function updateTimestamp() {
  const now = new Date();
  const ts = now.toLocaleTimeString("tr-TR");
  setText("gasUpdateTime", `Son güncelleme: ${ts}`);
  setText("elecUpdateTime", `Son güncelleme: ${ts}`);
  setText("waterUpdateTime", `Son güncelleme: ${ts}`);
}

function runGas() {
  const cfg = gasConfig;
  const prefix = cfg.prefix;
  const days = calculateDays(cfg.firstDateStr);
  const consumption = cfg.lastReading - cfg.firstReading;
  const dailyAvg = consumption / days;
  const estMonthly = dailyAvg * 30;
  const actualCost = consumption * cfg.unitPrice;
  const estMonthlyCost = estMonthly * cfg.unitPrice;

  setText(`${prefix}_daysCell`, round2(days));
  setText(`${prefix}_consCell`, round2(consumption));
  setText(`${prefix}_dailyAvgCell`, round2(dailyAvg));
  setText(`${prefix}_estMonthlyCell`, round2(estMonthly));
  setText(`${prefix}_unitPriceCell`, cfg.unitPrice.toFixed(2));
  setText(`${prefix}_periodTotalCostCell`, round2(actualCost));
  setText(`${prefix}_estMonthlyCostCell`, round2(estMonthlyCost));

  updateProgress(prefix, estMonthly, 1213.365);
}

function runElec() {
  const cfg = elecConfig;
  const prefix = cfg.prefix;
  const days = calculateDays(cfg.firstDateStr);
  const consumption = cfg.lastReading - cfg.firstReading;
  const dailyAvg = consumption / days;
  const estMonthly = dailyAvg * 30;
  const actualCost = consumption * cfg.unitPrice;
  const estMonthlyCost = estMonthly * cfg.unitPrice;

  setText(`${prefix}_daysCell`, round2(days));
  setText(`${prefix}_consCell`, round2(consumption));
  setText(`${prefix}_dailyAvgCell`, round2(dailyAvg));
  setText(`${prefix}_estMonthlyCell`, round2(estMonthly));
  setText(`${prefix}_unitPriceCell`, cfg.unitPrice.toFixed(2));
  setText(`${prefix}_periodTotalCostCell`, round2(actualCost));
  setText(`${prefix}_estMonthlyCostCell`, round2(estMonthlyCost));

  updateProgress(prefix, estMonthly, 357.22);
}

function runWater() {
  const cfg = waterConfig;
  const prefix = cfg.prefix;
  const days = calculateDays(cfg.firstDateStr);
  const consumption = cfg.lastReading - cfg.firstReading;
  const dailyAvg = consumption / days;
  const estMonthly = dailyAvg * 30;
  const actualCost = consumption * cfg.unitPrice;
  const estMonthlyCost = estMonthly * cfg.unitPrice;

  setText(`${prefix}_daysCell`, round2(days));
  setText(`${prefix}_consCell`, round2(consumption));
  setText(`${prefix}_dailyAvgCell`, round2(dailyAvg));
  setText(`${prefix}_estMonthlyCell`, round2(estMonthly));
  setText(`${prefix}_unitPriceCell`, cfg.unitPrice.toFixed(2));
  setText(`${prefix}_periodTotalCostCell`, round2(actualCost));
  setText(`${prefix}_estMonthlyCostCell`, round2(estMonthlyCost));

  updateProgress(prefix, estMonthly, 50);
}

function runAll() {
  runGas();
  runElec();
  runWater();
  updateTimestamp();
}

// Otomatik güncelleme (30 saniye)
setInterval(runAll, 30000);
