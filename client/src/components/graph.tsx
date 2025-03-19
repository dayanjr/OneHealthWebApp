import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto'; 

Chart.register(CategoryScale);

export default function Graph(length: number, graphLabels: string[], graphData: number[]){
        const data = {
            labels: graphLabels,
            datasets: [
              {
                label: 'Redeemed Count',
                data: graphData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          };
          
          const options = {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };

          if(length === 0){
            return(
                <h1>No Data Yet!</h1>
            )
          }
          
          return <Bar data={data} options={options} />;
    }