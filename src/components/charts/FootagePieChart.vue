<script>
import { Pie } from 'vue-chartjs';

export default Pie.extend({
    mounted() {
        // Overwriting base render method with actual data.
        this.renderChart({
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                    label: 'GitHub Commits',
                    backgroundColor: ['#1abc9c', '#9b59b6', '#3498db', '#f1c40f', '#e74c3c', '#f39c12', '#34495e', '#2ecc71', '#c0392b'],
                    data: [8.85, 8.85, 15.38, 5.77, 5.77]
                }
            ]
        }, {responsive: true});
    }
});
</script>
