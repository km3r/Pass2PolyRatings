/**
 * Created by Kyle on 5/25/2015.
 * Updated by Jackson on 2/21/2017.
 */


document.querySelectorAll('.row-gray, .row-white').forEach(function(row) {
    if (row.childNodes.length > 5) {
        var teacherPossibility1 = row.childNodes[7]
        var teacherPossibility2 = row.childNodes[9]
        var teacher = /\d/.test(teacherPossibility1.childNodes[0].data) ? teacherPossibility2 : teacherPossibility1

        parseName(teacher)
    }
});

function parseName(teacher) {
    var teacherName = teacher.childNodes[0].data
    var teacherData = getTeacherData(teacherName)

    teacher.className += 'hoverable'

    teacher.onclick = function(event) {
        if (teacherData.id != undefined)
         window.open('http://polyratings.com/eval.php?profid=' + teacherData.id)
        else
         window.open('http://www.google.com/search?q=' + teacherName + " site:polyratings.com")
    }
    if (teacherData.id != undefined)
    teacher.childNodes[0].data = teacher.childNodes[0].data + " (" + teacherData.rating + "/4.0)"
}

function getTeacherData(teacher) {
    var mostSimData = {}
    var mostSimFactor = 0

    for (key in teacherData) {

        var sim = similarity(normalize(key), normalize(teacher))
        if (sim > mostSimFactor) {
            mostSimFactor = sim
            mostSimData = teacherData[key]
        }
    }
    if (mostSimFactor > .65) {
        return mostSimData
    } else {
        return {}
    }
}

function normalize(str) {
    return str.trim()
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}