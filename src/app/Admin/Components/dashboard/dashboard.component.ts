import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }




  //Chart JS
  lineChartData: ChartDataSets[] = [
    {
      data: [
        20, 55, 25, 60, 40, 35, 0, 0, 0, 0, 0, 0
      ],
      label: "Monthly Customer's Order",
      lineTension: 0.3,
      },
  ];

  lineChartLabels: Label[] = [
    'Jan',
     'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ];


  ChartOptions: ChartOptions = {
    responsive: true,
    layout: {
      padding: {
        left: 30,
        right: 50,
        bottom: 20
      }
    },
    legend: {
      labels: {
        fontColor: '#fff',
        fontSize: 15,
        padding : 30
      },
    },
    scales : {
      yAxes: [{
        ticks:{
          min: 0,
          fontColor:'#fff',
          fontSize:15
        },
        gridLines:{
          color: 'rgb(255,255,255,0.1)',
        },
      }],
      xAxes: [{
        ticks:{
          min: 0,
          fontColor : "#fff",
          fontSize:15
        },
        gridLines:{
          color: 'rgb(255,255,255,0.1)',
        }
      }]
    }

  };


  lineChartColors: Color[] = [
    {
      backgroundColor: [
        'rgba(255, 255, 255, 0.2)',
      ],
      borderColor: [
        'rgb(255, 255, 255)'
      ],
      pointBorderColor: '#fff',
      borderWidth: 3,
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';


}
