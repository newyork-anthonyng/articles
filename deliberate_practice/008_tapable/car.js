const { SyncHook } = require("tapable");

class Car {
    constructor() {
      this.hooks = {
        radioChanged: new SyncHook(["radioStation"])
      };
  
      this.hooks.radioChanged.intercept({
        tap: (tapInfo) => {
            console.log(`${tapInfo.name} is getting called`);
        }
      })
    }

    setRadioStation(radioStation) {
        this.hooks.radioChanged.call(radioStation);
    }
  }
  
  const myCar = new Car();
  myCar.hooks.radioChanged.tap("RadioPlugin", radioStation => {
    console.log("Station was changed", radioStation);
  });
  myCar.hooks.radioChanged.tap("SpeakerPlugin", radioStation => {
    console.log("Updating Speaker UI", radioStation);
  });
  
  myCar.setRadioStation("100.1");
  // RadioPlugin is getting called
  // Station was changed 100.1
  // SpeakerPlugin is getting called
  // Updating Speaker UI 100.1

  myCar.setRadioStation("100.3");
  // RadioPlugin is getting called
  // Station was changed 100.3
  // SpeakerPlugin is getting called
  // Updating Speaker UI 100.3