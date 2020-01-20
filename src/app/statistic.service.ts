import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  public loader = true;
  public title: string;
  public subtitle: string;
  public dataArray: any[];

  public selectArray = [];

  public sortBy = 'Location';


  public click($event) {
    console.log($event.value);
  }
  constructor() {
    this.selectArray = [
      { value: 'Location', text: 'Sort by location' },
      { value: 'Job title', text: 'Sort by job' },
    ];

    this.loader = false;
    this.setupData();
  }
  setupData() {


    this.loader = true;
    this.dataArray = [];

    const location = users.reduce((obj, v) => {
      obj[v[this.sortBy]] = (obj[v[this.sortBy]] || 0) + 1;
      return obj;
    }, {})

    for (const name in location) {
      if (location.hasOwnProperty(name)) {
        this.dataArray.push({ name, value: location[name] })
      }
    }

    this.loader = false;

  }

}



export const users = [
  {
    "Location": "ASLG",
    "First Name": "Fabrice",
    "Surname": "DE BIASIO",
    "Job title": "CIO",
    "Email": "fdebiasio@aslaviationholdings.com",
    "Land phone": "",
    "Mobile Phone": "+33 784242424"
  },
  {
    "Location": "ASLG",
    "First Name": "Brian",
    "Surname": "AMPWERA",
    "Job title": "Groupe CEA",
    "Email": "bampwera@aslaviationholdings.com",
    "Land phone": "",
    "Mobile Phone": "+33 621758983"
  },
  {
    "Location": "ASLG",
    "First Name": "Mark",
    "Surname": "RYAN",
    "Job title": "Group IT Support Analyst",
    "Email": "mryan@aslaviationholdings.com",
    "Land phone": "+353 18928114",
    "Mobile Phone": "+353 879790528"
  },
  {
    "Location": "ASLB",
    "First Name": "Jean-Marc",
    "Surname": "URBANI",
    "Job title": "CIO",
    "Email": "jmurbani@aslairlines.com",
    "Land phone": "+32 42393036",
    "Mobile Phone": "+32 475924572"
  },
  {
    "Location": "ASLB",
    "First Name": "Christophe",
    "Surname": "NOPPELEY",
    "Job title": "IT Manager",
    "Email": "cnoppeley@aslairlines.com",
    "Land phone": "+32 42393152",
    "Mobile Phone": "+32 479794754"
  },
  {
    "Location": "ASLB",
    "First Name": "Tony",
    "Surname": "FOURMEAU",
    "Job title": "IT Coordinator",
    "Email": "tfourmeau@aslairlines.com",
    "Land phone": "+32 4 2393034",
    "Mobile Phone": "+32 492157777"
  },
  {
    "Location": "ASLB",
    "First Name": "Aurélien",
    "Surname": "DELVAUX",
    "Job title": "IT Admin",
    "Email": "adelvaux@aslairlines.com",
    "Land phone": ":+32 42393031",
    "Mobile Phone": "+32 492257000"
  },
  {
    "Location": "ASLB",
    "First Name": "Ludovic",
    "Surname": "DIVERS",
    "Job title": "IT Support",
    "Email": "ldivers@aslairlines.com",
    "Land phone": "+32 42393032",
    "Mobile Phone": "+32 492233030"
  },
  {
    "Location": "ASLB",
    "First Name": "Benoit",
    "Surname": "FIEVEZ",
    "Job title": "IT Support",
    "Email": "bfievez@aslairlines.com",
    "Land phone": "+32 42393037",
    "Mobile Phone": ""
  },
  {
    "Location": "ASLI",
    "First Name": "Graham",
    "Surname": "GOSLING",
    "Job title": "CIO",
    "Email": "ggosling@aslairlines.com",
    "Land phone": "+353 18121910",
    "Mobile Phone": "+353 872852202"
  },
  {
    "Location": "ASLI",
    "First Name": "Desmond",
    "Surname": "CRONIN / TBR",
    "Job title": "IT Admin",
    "Email": "dcronin@aslairlines.com",
    "Land phone": "+353 18121119",
    "Mobile Phone": ""
  },
  {
    "Location": "ASLI",
    "First Name": "Joe",
    "Surname": "LARKIN / TBR",
    "Job title": "IS Systems/Support Administrator",
    "Email": "",
    "Land phone": "",
    "Mobile Phone": ""
  },
  {
    "Location": "ASLI",
    "First Name": "Neil",
    "Surname": "GREEN",
    "Job title": "Developer",
    "Email": "ngreen@aslairlines.com",
    "Land phone": "+44 13325211777",
    "Mobile Phone": "+353 871303599"
  },
  {
    "Location": "ASLI",
    "First Name": "Garreth",
    "Surname": "O'MAHONY",
    "Job title": "Developer",
    "Email": "",
    "Land phone": "",
    "Mobile Phone": ""
  },
  {
    "Location": "ASLF",
    "First Name": "Françis",
    "Surname": "BRISEDOUX",
    "Job title": "IT Manager",
    "Email": "fbrisedoux@aslairlines.com",
    "Land phone": "+33 148169886",
    "Mobile Phone": "+33 675683148"
  },
  {
    "Location": "ASLF",
    "First Name": "Marianne",
    "Surname": "SEGRET",
    "Job title": "Project Manager",
    "Email": "msegret@aslairlines.com",
    "Land phone": "+33 148169871",
    "Mobile Phone": "+33 625880971"
  },
  {
    "Location": "ASLF",
    "First Name": "Jean-Claude",
    "Surname": "LEFEVRE",
    "Job title": "",
    "Email": "jclefevre@aslairlines.com",
    "Land phone": "+33 148169839",
    "Mobile Phone": "+33 627504158"
  },
  {
    "Location": "ASLF",
    "First Name": "Sébastien",
    "Surname": "VAIRA",
    "Job title": "",
    "Email": "svaira@aslairlines.com",
    "Land phone": "+33 148169820",
    "Mobile Phone": "+33 699196951"
  },
  {
    "Location": "ASLF",
    "First Name": "Loïc",
    "Surname": "TOSCANI",
    "Job title": "IT Admin",
    "Email": "ltoscani@aslairlines.com",
    "Land phone": "+33 148169838",
    "Mobile Phone": "+33 668727408"
  },
  {
    "Location": "ASLF",
    "First Name": "Sébastien",
    "Surname": "COUPPEZ",
    "Job title": "IT SUPPORT",
    "Email": "scouppez@aslairlines.com",
    "Land phone": "+33 148169816",
    "Mobile Phone": "+33 627504175"
  },
  {
    "Location": "ASLF",
    "First Name": "Thomas",
    "Surname": "BAUDRY",
    "Job title": "",
    "Email": "tbaudry@aslairlines.com",
    "Land phone": "+33 148169817",
    "Mobile Phone": "+33 627504178"
  },
  {
    "Location": "ASLS",
    "First Name": "Luc",
    "Surname": "DOERENBECHER",
    "Job title": "CUBEO",
    "Email": "itasls@aslairlines.com",
    "Land phone": "+33389608450",
    "Mobile Phone": "+33 776979663"
  },
  {
    "Location": "ASLH",
    "First Name": "Dániel",
    "Surname": "DLUHOPOLSZKY",
    "Job title": "IT Support",
    "Email": "ddluhopolszky@aslairlines.com",
    "Land phone": "+36 12967008",
    "Mobile Phone": "+36 204740750"
  },
  {
    "Location": "KMILE",
    "First Name": "Sangkom",
    "Surname": "KOSITWIWAT",
    "Job title": "IT Manager",
    "Email": "Sangkom.K@kerrylogistics.com",
    "Land phone": "+66 26868940",
    "Mobile Phone": "+66 806244665"
  },
  {
    "Location": "QUIKJET",
    "First Name": "Sanjib",
    "Surname": "ADHIKARY",
    "Job title": "IT Lead",
    "Email": "sanjib.adhikary@quikjet.co.in",
    "Land phone": "",
    "Mobile Phone": "+91 7384844837"
  },
  {
    "Location": "SAFAIR",
    "First Name": "Eswee",
    "Surname": "VORSTER",
    "Job title": "VP IT & Innovation",
    "Email": "evorster@safair.co.za",
    "Land phone": "+27 119280081",
    "Mobile Phone": "+27 824161846"
  },
  {
    "Location": "SAFAIR",
    "First Name": "Elene",
    "Surname": "VAN RENSBURG",
    "Job title": "Manager IT Systems",
    "Email": "IT Systems Manager\nevanrensburg@safair.co.zaIT Systems Manager\nevanrensburg@safair.co.za",
    "Land phone": "+27 119280028",
    "Mobile Phone": "+27 784570788"
  },
  {
    "Location": "SAFAIR",
    "First Name": "Ruan",
    "Surname": "ROOS",
    "Job title": "IT Support Specialist",
    "Email": "rroos@safair.co.za",
    "Land phone": "+27 119280014",
    "Mobile Phone": "+27 834004132"
  },
  {
    "Location": "SAFAIR",
    "First Name": "Z",
    "Surname": "BEKKER",
    "Job title": "Industrial Engineer",
    "Email": "zbekker@safair.co.za",
    "Land phone": "",
    "Mobile Phone": ""
  },
  {
    "Location": "SAFAIR",
    "First Name": "C",
    "Surname": "DU TOIT",
    "Job title": "Industrial Engineer",
    "Email": "cdutoit@safair.co.za",
    "Land phone": "",
    "Mobile Phone": ""
  },
  {
    "Location": "SAFAIR",
    "First Name": "Kuba",
    "Surname": "REBISZ",
    "Job title": "IT Programmer",
    "Email": "krebisz@safair.co.za",
    "Land phone": "+27 119280029",
    "Mobile Phone": "+27 760199126"
  },
  {
    "Location": "SAFAIR",
    "First Name": "S",
    "Surname": "RUST",
    "Job title": "Data Analyst",
    "Email": "srust@safair.co.za",
    "Land phone": "",
    "Mobile Phone": ""
  },
  {
    "Location": "SAFAIR",
    "First Name": "Gideon",
    "Surname": "SMIT",
    "Job title": "IT System Support (Outsourced)",
    "Email": "gsmit@safair.co.za",
    "Land phone": "",
    "Mobile Phone": ""
  },
  {
    "Location": "SAFAIR",
    "First Name": "P",
    "Surname": "MAKOBE",
    "Job title": "IT System Support (Outsourced)",
    "Email": "pmakobe@safair.co.za",
    "Land phone": "",
    "Mobile Phone": ""
  }
]