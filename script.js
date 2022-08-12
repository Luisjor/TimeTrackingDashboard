window.addEventListener("load", () => {
    
    const currentHours = document.querySelectorAll(".currentHours");
    const PreviousHours = document.querySelectorAll(".PreviousHours");
    const dailyElements = document.querySelectorAll("#Info");
    const TimeButton = document.querySelectorAll("#TimeButtons");
    const rawDataJSON = 'https://raw.githubusercontent.com/Luisjor/TimeTrackingDashboard/main/data.json';

    const getData = async () => {
        const response = await fetch(rawDataJSON);
        const data = await response.json();
        return data;
    };

    TimeButton.forEach(async button => {
      let obj = await getData();

        button.addEventListener("click", () => {
            TimeButton.forEach((b) => {
                b.className = ("Button");
                button.className = ("ActiveB");
            })

        const period = button['dataset']['period'];
        
        currentHours.forEach((current) => {
            const activity = obj.find(({ title }) => {
                return title === current["dataset"]["activity"];
              })
              current.innerText = activity['timeframes'][period]['current'] + 'hrs';
        })

        PreviousHours.forEach((previous) => {
            const activity = obj.find(({ title }) => {
                return title === previous["dataset"]["activity"];
            })
            if (period === "daily") {
                previous.innerText = "Last day - " + activity["timeframes"][period]["previous"] + "hrs";
            }
            if (period === "weekly") {
                previous.innerText = "Last week - " + activity["timeframes"][period]["previous"] + "hrs";
            }
            if (period === "monthly") {
                previous.innerText = "Last month - " + activity["timeframes"][period]["previous"] + "hrs";
            }
            
        })


        })
    })
    });

