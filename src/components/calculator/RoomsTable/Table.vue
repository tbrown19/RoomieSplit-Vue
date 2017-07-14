<template>
    <div>
        <hr>
        <el-table :data="roomsArrayComputed" style="width: 100%" stripe tooltip-effect="dark">
    
            <el-table-column label="Actions" type="expand">
                <template scope="scope">
                    <RoomExtraInfo :room="scope.row"></RoomExtraInfo>
                </template>
            </el-table-column>
    
            <el-table-column label="Room" prop="roomNumber"></el-table-column>
    
            <el-table-column label="Length" min-width='120px'>
                <template scope="scope">
                    <MeasurementInput type='length' :scope="scope" @areaUpdated="calculateArea"></MeasurementInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Width" min-width='120px'>
                <template scope="scope">
                    <MeasurementInput type='width' :scope="scope" @areaUpdated="calculateArea"></MeasurementInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Area" min-width='100px'>
                <template scope="scope">
                    <FootageInput :scope="scope" @areaUpdated="areaUpdated"></FootageInput>
                </template>
            </el-table-column>
    
            <el-table-column label="Occupants" min-width='100px'>
                <template scope="scope">
                    <OccupantsInput v-if="scope.row.area > 0" :scope="scope" @occupantsUpdated="occupantsUpdated"></OccupantsInput>
                </template>
            </el-table-column>
    
            <!--<el-table-column label="% Total" prop="percentageTotal"></el-table-column>-->
    
            <el-table-column label="Payment" min-width='100px'>
                <template scope="scope">
                    <span v-if="scope.row.payment > 0">
                        {{ scope.row.payment }}
                    </span>
                </template>
            </el-table-column>
    
        </el-table>
    </div>
</template>


<script>
export default {
    data: function () {
        return {

        };
    }
};
</script>
