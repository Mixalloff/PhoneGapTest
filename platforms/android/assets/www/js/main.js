var calc, calc_distance, f_Dais, f_Hamming, f_Raccelo_Rao, f_Sokal_Mishner, f_Sokal_Snif, f_Ul, f_jokar_Nidmen, f_kuljinsky, fill_table, func_a, func_b, func_g, func_h, generate_distances, generate_markup, get_a, get_b, get_c, get_list_values_by_row, get_obraz, get_result_object, get_value_by_selector;

get_value_by_selector = function(selector) {
  var selectedObject;
  selectedObject = $(selector);
  if (selectedObject.attr("type") === "checkbox") {
    return +selectedObject.prop("checked");
  } else {
    return selectedObject.val();
  }
};

$("#generate").click(function() {
  $(".fill_table").html(fill_table(get_a(), get_b(), "X"));
  return $(".fill .input_shape").css({
    display: 'block'
  });
});

$("#generate2").click(function() {
  $(".my_shape").html(fill_table(get_c(), get_b(), "S"));
  return $(".fill .calculate").css({
    display: 'block'
  });
});

get_a = function() {
  return $(".count_priznak").val();
};

get_b = function() {
  return $(".count_classes").val();
};

get_c = function() {
  return $(".input_shape input").val();
};

get_list_values_by_row = function(selector_row) {
  var i, l, ref, results;
  results = [];
  for (i = l = 1, ref = +get_b() + 1; 1 <= ref ? l <= ref : l >= ref; i = 1 <= ref ? ++l : --l) {
    results.push(get_value_by_selector(selector_row + ("td:nth-child(" + i + ") input")));
  }
  return results;
};

get_obraz = function(rows, table_name) {
  var i, l, ref, results;
  results = [];
  for (i = l = 1, ref = rows; 1 <= ref ? l <= ref : l >= ref; i = 1 <= ref ? ++l : --l) {
    results.push(get_list_values_by_row("." + table_name + (" tr:nth-child(" + i + ") ")));
  }
  return results;
};

func_a = function(a, b) {
  return a * b;
};

func_b = function(a, b) {
  return (1 - a) * (1 - b);
};

func_g = function(a, b) {
  return a * (1 - b);
};

func_h = function(a, b) {
  return (a - 1) * b;
};

f_Raccelo_Rao = function(a, b, g, h, n) {
  if (a + b + g + h === 0) {
    return 0;
  } else {
    return a / (a + b + g + h);
  }
};

f_jokar_Nidmen = function(a, b, g, h, n) {
  if (n - b === 0) {
    return 0;
  } else {
    return a / (n - b);
  }
};

f_Dais = function(a, b, g, h, n) {
  if (2 * a + g + h === 0) {
    return 0;
  } else {
    return a / (2 * a + g + h);
  }
};

f_Sokal_Snif = function(a, b, g, h, n) {
  if (a + 2 * (g + h) === 0) {
    return 0;
  } else {
    return a / (a + 2 * (g + h));
  }
};

f_Sokal_Mishner = function(a, b, g, h, n) {
  if (n === 0) {
    return 0;
  } else {
    return (a + b) / n;
  }
};

f_kuljinsky = function(a, b, g, h, n) {
  if (g + h === 0) {
    return 0;
  } else {
    return a / (g + h);
  }
};

f_Ul = function(a, b, g, h, n) {
  if (a * b + g * h) {
    return 0;
  } else {
    return (a * b - g * h) / (a * b + g * h);
  }
};

f_Hamming = function(a, b, g, h, n) {
  return g + h;
};

calc_distance = function(func, list) {
  return func(list[0], list[1], list[2], list[3], list[4]);
};

calc = function(func, ls1, ls2) {
  var i, l, ref, sum;
  sum = 0;
  for (i = l = 1, ref = ls1.length; 1 <= ref ? l < ref : l > ref; i = 1 <= ref ? ++l : --l) {
    sum = sum + func(ls1[i], ls2[i]);
  }
  return sum;
};

get_result_object = function(list1, list2) {
  var array, j;
  array = (function() {
    var l, ref, results;
    results = [];
    for (j = l = 0, ref = get_a(); 0 <= ref ? l < ref : l > ref; j = 0 <= ref ? ++l : --l) {
      results.push([calc(func_a, list1, list2[j]), calc(func_b, list1, list2[j]), calc(func_g, list1, list2[j]), calc(func_h, list1, list2[j]), +get_b()]);
    }
    return results;
  })();
  return array;
};

generate_distances = function(list2, head, func, abgh) {
  var a, array, index, j, max;
  max = -1;
  index = 0;
  array = (function() {
    var l, ref, results;
    results = [];
    for (j = l = 0, ref = get_a(); 0 <= ref ? l < ref : l > ref; j = 0 <= ref ? ++l : --l) {
      a = calc_distance(func, abgh[j]);
      if (a > max) {
        index = j;
        max = a;
      }
      results.push(a);
    }
    return results;
  })();
  return {
    distances: array,
    minimum: max,
    min_index: index,
    title: head,
    closest_clas: list2[index][0]
  };
};

generate_markup = function(array) {
  var i, j, k, l, m, markup, o, ref, ref1;
  markup = "";
  for (i = l = 0, ref = array.length; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
    markup = markup + ("<div class=\"row\">\n<div class=\"col-md-12\">\n<h4>Образ S" + (i + 1) + "</h4>");
    for (j = m = 0; m < 8; j = ++m) {
      markup = markup + ("<div class=\"col-md-3\">\n<h5>" + array[i][j].title + "</h5><div class=\"res\">");
      for (k = o = 0, ref1 = array[i][j].distances.length; 0 <= ref1 ? o < ref1 : o > ref1; k = 0 <= ref1 ? ++o : --o) {
        markup = markup + ("<span class='till'>до X" + k + "</span> " + array[i][j].distances[k] + "<br/>");
      }
      markup = markup + ("<span class='min'>max = " + array[i][j].minimum + " </span><br/>");
      markup = markup + ("<span class='close_clas'> Всех ближе к классу " + array[i][j].closest_clas + " </span>");
      markup = markup + "</div></div>";
    }
    markup = markup + "</div></div>";
  }
  return $(".obraz_results").html(markup);
};

$(".calculate").click(function() {
  var abgh_array, final, i, input_obraz, my_obraz, result;
  input_obraz = get_obraz(get_a(), "fill_table");
  my_obraz = get_obraz(get_c(), "my_shape");
  final = (function() {
    var l, ref, results;
    results = [];
    for (i = l = 0, ref = my_obraz.length; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
      abgh_array = get_result_object(my_obraz[i], input_obraz);
      result = [generate_distances(input_obraz, "Рассел и Рао", f_Raccelo_Rao, abgh_array), generate_distances(input_obraz, "Жокар и Нидмен", f_jokar_Nidmen, abgh_array), generate_distances(input_obraz, "Дайс", f_Dais, abgh_array), generate_distances(input_obraz, "Сокаль и Сниф", f_Sokal_Snif, abgh_array), generate_distances(input_obraz, "Сокаль и Мишнер", f_Sokal_Mishner, abgh_array), generate_distances(input_obraz, "Кульжинский", f_kuljinsky, abgh_array), generate_distances(input_obraz, "Юл", f_Ul, abgh_array), generate_distances(input_obraz, "Хэмминг", f_Hamming, abgh_array)];
      results.push(result);
    }
    return results;
  })();
  return generate_markup(final);
});

fill_table = function(a, b, name) {
  var i, j, l, m, o, ref, ref1, ref2, table, th;
  table = "<thead>";
  for (i = l = 0, ref = b; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
    th = "<th><input class='form-control' value='" + (i === 0 ? 'Класс/Признак' : 'Признак ' + i) + "'/></th>";
    table = table + th;
  }
  table = table + "</thead>";
  for (i = m = 1, ref1 = a; 1 <= ref1 ? m <= ref1 : m >= ref1; i = 1 <= ref1 ? ++m : --m) {
    table = table + "<tr>";
    for (j = o = 0, ref2 = b; 0 <= ref2 ? o <= ref2 : o >= ref2; j = 0 <= ref2 ? ++o : --o) {
      if (j === 0) {
        table = table + ("<td><input type='text' class='form-control' placeholder='" + (name + i) + "'/></td>");
      } else {
        table = table + "<td><input type='checkbox' class='form-control' '/></td>";
      }
    }
    table = table + "</tr>";
  }
  return table;
};
