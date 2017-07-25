<script>
import { Pie } from 'vue-chartjs';

export default Pie.extend({
    props: ['data', 'labels'],
    mounted() {
        console.log(this.data);
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: this.labels,
            datasets: [
                {
                    label: 'GitHub Commits',
                    backgroundColor: ['#1abc9c', '#9b59b6', '#3498db', '#f1c40f', '#e74c3c', '#34495e', '#f39c12', '#2ecc71', '#c0392b'],
                    data: this.data
                }
            ]
        }, {responsive: true});
    }
});
</script>
