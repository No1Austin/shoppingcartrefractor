// ===== v0 (MESSY / BAD CODE ON PURPOSE) =====
// Problems: global vars, weird names, duplication, tight coupling, long functions, inconsistent formatting

var c = []; // cart
var u = { name: "User1", email: "user1@email.com" };

function add(n, q, p) {
  if (!n) return;
  if (q <= 0) q = 1;
  if (p < 0) p = 0;

  // duplication: searching logic repeated in other functions too
  var found = null;
  for (var i = 0; i < c.length; i++) {
    if (c[i].n === n) found = c[i];
  }
  if (found) {
    found.q = found.q + q;
  } else {
    c.push({ n: n, q: q, p: p });
  }
  console.log("added " + n);
}

function rm(n) {
  // duplication: loops again
  var newc = [];
  for (var i = 0; i < c.length; i++) {
    if (c[i].n !== n) newc.push(c[i]);
  }
  c = newc;
  console.log("removed? " + n);
}

function view() {
  var t = 0;
  var s = "";
  for (var i = 0; i < c.length; i++) {
    var it = c[i];
    t = t + it.q * it.p;
    s = s + it.n + " x" + it.q + " = " + (it.q * it.p) + "\n";
  }
  console.log(s + "TOTAL=" + t);
}

function clearAll() {
  c = [];
  console.log("cleared");
}

// random discount thing (bad)
function disc(x) {
  // only supports one discount logic, hard-coded
  var total = 0;
  for (var i = 0; i < c.length; i++) total += c[i].q * c[i].p;
  if (x === "VIP") total = total * 0.8;
  if (x === "NONE") total = total;
  console.log("after disc = " + total);
}

// ===== Test =====
add("Apple", 2, 1.5);
add("Orange", 3, 2.0);
view();
rm("Apple");
view();
disc("VIP");
clearAll();
view();