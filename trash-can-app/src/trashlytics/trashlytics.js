import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { FlexibleWidthXYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, DiscreteColorLegend, Crosshair } from 'react-vis';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Link} from 'react-router-dom';
class Trashlytics extends Component {
    recycleByDayData = [];
    thownAwayByDayData = [];
    recycleByWeightData = [];
    thownAwayByWeightData = [];
    state = {
        startingDate: null,
        endingDate: null,
        throwAwayByDayValue: null,
        recycleByDayValue: null,
        throwAwayWeightByDayValue: null,
        recycleWeightByDayValue: null
    }
    onStartingDateChange = (event) =>{
        this.setState({startingDate: new Date(event.target.value)});
    }
    onEndingDateChange = (event) =>{
        this.setState({endingDate: new Date(event.target.value)});
    }
    timeToHtmlTime = (time) =>{
        return ((time.getFullYear()<10)?"0":'')+time.getFullYear() + '-' +((time.getMonth()<10)?"0":"")+ (time.getMonth()+1) +'-'+ ((time.getDate()<10)?"0":'')+ time.getDate();
    }
    render() {
        //recycleByDay
        var recycleByDayArray = [];
        var recycleUsedDates = [];
        if (this.props.trashCanData) {
            for (const entityIndex in this.props.trashCanData.entries) {
                const entity = this.props.trashCanData.entries[entityIndex];
                const inputDate = new Date(entity.date.year, entity.date.month - 1, entity.date.day, entity.time.hour, entity.time.minute, entity.time.second);
                if (entity.status === 1 && ((this.state.startingDate&&this.state.endingDate)?(inputDate.getTime()> this.state.startingDate.getTime() && inputDate.getTime() < this.state.endingDate.getTime()):true)) {
                    if (!recycleUsedDates.includes(inputDate.getTime())) {
                        recycleByDayArray.push({ x: inputDate, y: 1 });
                        recycleUsedDates.push(inputDate.getTime());
                    }
                    else {
                        const index = recycleByDayArray.findIndex(element => element.x.getTime() === inputDate.getTime());
                        recycleByDayArray[index] = { x: recycleByDayArray[index].x, y: recycleByDayArray[index].y + 1 };
                    }
                }
            }
            this.recycleByDayData = recycleByDayArray;
        }
        //thrown away by day
        var thrownAwayByDayArray = [];
        var thrownAwayUsedDates = [];
        if (this.props.trashCanData) {
            for (const entityIndex in this.props.trashCanData.entries) {
                const entity = this.props.trashCanData.entries[entityIndex];
                const inputDate = new Date(entity.date.year, entity.date.month - 1, entity.date.day, entity.time.hour, entity.time.minute, entity.time.second);
                if (entity.status === 0 && ((this.state.startingDate&&this.state.endingDate)?(inputDate.getTime()> this.state.startingDate.getTime() && inputDate.getTime() < this.state.endingDate.getTime()):true)) {
                    if (!thrownAwayUsedDates.includes(inputDate.getTime())) {
                        thrownAwayByDayArray.push({ x: inputDate, y: 1 });
                        thrownAwayUsedDates.push(inputDate.getTime());
                    }
                    else {
                        const index = thrownAwayByDayArray.findIndex(element => element.x.getTime() === inputDate.getTime());
                        thrownAwayByDayArray[index] = { x: thrownAwayByDayArray[index].x, y: thrownAwayByDayArray[index].y + 1 };
                    }
                }
            }
            this.thrownAwayByDayData = thrownAwayByDayArray;
        }
        //recycleWeightByDay
        var recycleWeightByDayArray = [];
        var recycleWeightUsedDates = [];
        if (this.props.trashCanData) {
            for (const entityIndex in this.props.trashCanData.entries) {
                const entity = this.props.trashCanData.entries[entityIndex];
                const inputDate = new Date(entity.date.year, entity.date.month - 1, entity.date.day, entity.time.hour, entity.time.minute, entity.time.second);
                if (entity.status === 1 && ((this.state.startingDate&&this.state.endingDate)?(inputDate.getTime()> this.state.startingDate.getTime() && inputDate.getTime() < this.state.endingDate.getTime()):true)) {
                    if (!recycleWeightUsedDates.includes(inputDate.getTime())) {
                        recycleWeightByDayArray.push({ x: inputDate, y: entity.weight });
                        recycleWeightUsedDates.push(inputDate.getTime());
                    }
                    else {
                        const index = recycleWeightByDayArray.findIndex(element => element.x.getTime() === inputDate.getTime());
                        recycleWeightByDayArray[index] = { x: recycleWeightByDayArray[index].x, y: recycleWeightByDayArray[index].y + entity.weight };
                    }
                }
            }
            this.recycleByWeightData = recycleWeightByDayArray;
        }
        //thrown away weight by day
        var thrownAwayWeightByDayArray = [];
        var thrownAwayWeightUsedDates = [];
        if (this.props.trashCanData) {
            for (const entityIndex in this.props.trashCanData.entries) {
                const entity = this.props.trashCanData.entries[entityIndex];
                const inputDate = new Date(entity.date.year, entity.date.month - 1, entity.date.day, entity.time.hour, entity.time.minute, entity.time.second);
                if (entity.status === 0 && ((this.state.startingDate&&this.state.endingDate)?(inputDate.getTime()> this.state.startingDate.getTime() && inputDate.getTime() < this.state.endingDate.getTime()):true)) {
                    if (!thrownAwayWeightUsedDates.includes(inputDate.getTime())) {
                        thrownAwayWeightByDayArray.push({ x: inputDate, y: entity.weight });
                        thrownAwayWeightUsedDates.push(inputDate.getTime());
                    }
                    else {
                        const index = thrownAwayWeightByDayArray.findIndex(element => element.x.getTime() === inputDate.getTime());
                        thrownAwayWeightByDayArray[index] = { x: thrownAwayWeightByDayArray[index].x, y: thrownAwayWeightByDayArray[index].y + entity.weight };
                    }
                }
            }
            this.thrownAwayByWeightData = thrownAwayWeightByDayArray;
            console.log(this.thrownAwayByWeightData, this.recycleByWeightData);
        }
        return (
            <Container>
                <div style={{ height: '80px' }} />
                <Card style = {{marginBottom: '10px'}}>
                    <Card.Header>Set up the time frame for your data!</Card.Header>
                    <Card.Body>Use the date selectors to select a starting and ending date for your data. Starting and ending dates are inclusive.</Card.Body>
                    <Card.Body>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Start Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input required type='date' onChange = {this.onStartingDateChange} max = {this.state.endingDate?this.timeToHtmlTime(this.state.endingDate):null}></input>
                            <span class="validity"></span>
                        </InputGroup>
                    </Card.Body>
                    <Card.Body>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>End Date</InputGroup.Text>
                            </InputGroup.Prepend>
                            <input type='date' required onChange = {this.onEndingDateChange} min = {this.state.startingDate?this.timeToHtmlTime(this.state.startingDate):null}></input>
                            <span class="validity"></span>
                        </InputGroup>
                    </Card.Body>
                </Card>
                <Jumbotron>
                    <h1>Your Data:</h1>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">

                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Amount of Trash Thrown/Recycled Over Time</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Weight of Trash Thrown/Recycled Over Time</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third">More to come...</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first" onClick = {()=>this.setState({})}>
                                    <DiscreteColorLegend items={['Recycled', 'Thrown Away']} colors={['green', 'red']}></DiscreteColorLegend>
                                        <FlexibleWidthXYPlot height={300} xType="time" onMouseLeave={() => this.setState({ recycleByDayValue: false, throwAwayByDayValue: false })}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis title='Day' />
                                            <YAxis title='Times Recycled' />
                                            {(this.state.recycleByDayValue && this.state.throwAwayByDayValue) ? <Crosshair values={[this.state.recycleByDayValue, this.state.throwAwayByDayValue]}
                                                titleFormat={(d) => ({ title: 'Date', value: d[0].x.toLocaleDateString() })} itemsFormat={(i) => ([{ title: 'Recycled', value: i[0].y }, { title: 'Thrown Away', value: i[1].y }])}
                                            /> : null}
                                            <LineSeries data={this.recycleByDayData} animation color='green' onNearestX={value => this.setState({ recycleByDayValue: value })} />
                                            <LineSeries data={this.thrownAwayByDayData} animation color='red' onNearestX={value => this.setState({ throwAwayByDayValue: value })} />
                                        </FlexibleWidthXYPlot>
                                        <small>* Click on the graph regions to reveal graphs. This is to save rendering power on devices.</small>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second" onClick = {()=>this.setState({})}>
                                    <DiscreteColorLegend items={['Recycled', 'Thrown Away']} colors={['green', 'red']}></DiscreteColorLegend>
                                        <FlexibleWidthXYPlot height={300} xType="time" onMouseLeave={() => this.setState({ recycleWeightByDayValue: false, throwAwayWeightByDayValue: false })}>
                                            <VerticalGridLines />
                                            <HorizontalGridLines />
                                            <XAxis title='Day' />
                                            <YAxis title='Weight Recycled' />
                                            {(this.state.recycleWeightByDayValue && this.state.throwAwayWeightByDayValue) ? <Crosshair values={[this.state.recycleWeightByDayValue, this.state.throwAwayWeightByDayValue]}
                                                titleFormat={(d) => ({ title: 'Date', value: d[0].x.toLocaleDateString() })} itemsFormat={(i) => ([{ title: 'Recycled', value: i[0].y }, { title: 'Thrown Away', value: i[1].y }])}
                                            /> : null}
                                            <LineSeries data={this.recycleByWeightData} animation color='green' onNearestX={value => this.setState({ recycleWeightByDayValue: value })} />
                                            <LineSeries data={this.thrownAwayByWeightData} animation color='red' onNearestX={value => this.setState({ throwAwayWeightByDayValue: value })} />
                                        </FlexibleWidthXYPlot>
                                        <small>* Click on the graph regions to reveal graphs. This is to save rendering power on devices.</small>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        <p>Meanwhile, try exporting your data and creating your own representations of your trash usage! Go to the <Link to = 'downloaddata'>Data Download page</Link> to get your data and share your creations with <b>#SmartTrashData</b>.</p>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Jumbotron>
            </Container>
        );
    }
}

export default Trashlytics;