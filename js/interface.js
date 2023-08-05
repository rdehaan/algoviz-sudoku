// This file is released under the MIT license.
// See LICENSE.md.

function interface_new_board(new_board) {
  console.log("Interface: new board");
  board = new_board;
  sudoku_render_board();
}
function interface_model(board) {
  model_found = true;
  console.log("Interface: model");
  var index = document.getElementById("mode").selectedIndex;
  var enumerate_all = false;
  if (index == 1) {
    enumerate_all = true;
  }
  if (enumerate_all && document.getElementById("pause-on-model").checked) {
    do_pause();
  } else if (!enumerate_all) {
    do_abort();
  }
}
function interface_before_start() {
  console.log("Interface: before start");
  sudoku_initialize_candidates();
  sudoku_render_board();
}
function interface_start() {
  console.log("Interface: start");
  document.getElementById("run").disabled = true;
  document.getElementById("pause").disabled = false;
  document.getElementById("resume").disabled = true;
  document.getElementById("abort").disabled = false;
  should_abort = false;
  board_blocked = true;
  do_resume();
}
function interface_finish() {
  console.log("Interface: finish");
  document.getElementById("run").disabled = false;
  document.getElementById("pause").disabled = true;
  document.getElementById("resume").disabled = true;
  document.getElementById("abort").disabled = true;
  board_blocked = false;
}
function interface_wait_time_propagate() {
  speed_factor = document.getElementById("speed").value;
  return speed_factor*1000;
}
function interface_wait_time_new_board() {
  speed_factor = document.getElementById("speed").value;
  return speed_factor*1000;
}

function load_sudoku() {
  if (!board_blocked) {
    sudoku_initialize_board();
    sudoku_input = document.getElementById("sudoku-input").value;
    sudoku_load_from_string(sudoku_input);
    sudoku_render_board();
  }
}
function clear_sudoku() {
  if (!board_blocked) {
    sudoku_initialize_board();
    sudoku_render_board();
  }
}
function load_example_sudoku() {
  if (!board_blocked) {
    sudoku_initialize_board();
    sudoku_as_string = document.getElementById("example-sudokus").value;
    sudoku_load_from_string(sudoku_as_string);
    sudoku_render_board();
  }
}

can_resume = true;
function do_pause() {
  document.getElementById("pause").disabled = true;
  document.getElementById("resume").disabled = false;
  can_resume = false;
}
function do_resume() {
  document.getElementById("pause").disabled = false;
  document.getElementById("resume").disabled = true;
  can_resume = true;
}
function do_abort() {
  should_abort = true;
  do_resume();
  document.getElementById("pause").disabled = true;
  document.getElementById("resume").disabled = true;
  document.getElementById("abort").disabled = true;
}

function use_hidden_singles() {
  return document.getElementById("use-hidden-singles").checked;
}

sudoku_initialize_board();
sudoku_render_board();
board_blocked = false;
