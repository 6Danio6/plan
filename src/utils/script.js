fetch('https://raw.githubusercontent.com/6Danio6/6Danio6.github.io/plan/timetables.json')
            .then((response) => response.json())
            .then((timetables) => {
                const teachers = Object.keys(timetables).sort();
                let trs = document.querySelectorAll("tr.lessons")

                teachers.forEach((teacher)=> {
                    let li = document.createElement("li");
                    li.innerHTML = teacher;
                    li.id = teacher;
                    li.onclick = ((teacher) => { return () =>{ fillTable(teacher); }})(teacher);
                    list.appendChild(li);
                })

                function fillTable(teacher){
                    for (let li of list.children) {
                        li.style.removeProperty("background-color");
                    }
                    document.getElementById(teacher).style["background-color"] = "#17f9ff";
                    for (let day in timetables[teacher]){ // 0-4
                        for (let lesson in timetables[teacher][day]){ // 0-11
                            trs[Number(lesson)+1].children[Number(day) + 1].innerHTML = (timetables[teacher][day][lesson][0] ? timetables[teacher][day][lesson][0] : "") 
                            + "<br>" 
                            + (timetables[teacher][day][lesson][1] != 0 ? timetables[teacher][day][lesson][1] : "");
                        }
                    }
                    header.innerHTML = teacher;
                }
            }
        );
