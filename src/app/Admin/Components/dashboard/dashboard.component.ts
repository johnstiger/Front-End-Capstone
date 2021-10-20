import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Categories, Orders } from 'src/app/Customer/Common/model/customer-model';
import { AdminService } from '../../Services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http : AdminService) { }

  token = localStorage.getItem('admin_token');

  countProducts : any;
  countSales : any;
  categories! : Categories[];
  pendingOrders! : Orders[];
  countOrders : any;
  countCustomers : any;

  ngOnInit(): void {
    this.getDashboard();
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



  async getDashboard(){
    this.http.loading();
    await this.http.dashboard(this.token).then((result)=>{
      this.categories = result.data.categories;
      this.pendingOrders = result.data.pendingOrders;
      this.countCustomers = result.data.customers;
      this.countOrders = result.data.orders;
      this.countSales = result.data.sales;
      this.countProducts = result.data.products;
      this.http.closeLoading();
    });

  }



}
