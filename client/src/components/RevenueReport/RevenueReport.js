import { useHistory } from 'react-router-dom';
import './RevenueReport.scss';
import { TfiClose } from 'react-icons/tfi';
import { MdFilterList } from 'react-icons/md';
import { TbRectangleFilled } from 'react-icons/tb';
import React from 'react';
import { useImmer } from "use-immer";
import { CurrencyFormat } from '../Format/FormatNumber';
import { VictoryPie } from "victory";
import { GET_REVENUE_REPORT } from '../Query/RenenueQuery';
import { useLazyQuery } from '@apollo/client';

const RevenueReport = () => {

    const history = useHistory();
    const [endAngle, setEndAngle] = React.useState(0);
    const [revenueReportList, setRevenueReportList] = React.useState([]);
    const [roomCategories, setRoomCategories] = React.useState([]);
    const [visualData, setVisualData] = React.useState([]);
    const [searchMonth, setSearchMonth] = React.useState('');
    const [searchYear, setSearchYear] = React.useState('');

    const [filterLabel, setFilterLabel] = useImmer({
        month: '',
        year: ''
    });

    const PIE_CHART_COLORS = ["#E8A44E", "#4763A5", "#EA5C5D", "#A6D854", "#66C2A5", "#E78AC3", "#F7B295", "#9E3533"];
    const PIE_CHART_CLASS_COLORS = [
        'first_color', 'second_color', 'third_color',
        'fourth_color', 'fifth_color', 'sixth_color',
        'seventh_color', 'eighth_color'
    ];

    const [getRevenueReport] = useLazyQuery(GET_REVENUE_REPORT, {
        fetchPolicy: "no-cache"
    });

    const fetchRevenueReport = async () => {
        let { data: { revenue_report } } = await getRevenueReport({
            variables: {
                month: +searchMonth,
                year: +searchYear
            }
        });

        setFilterLabel(draft => {
            if (!searchMonth || searchYear) {
                draft.month = +searchMonth;
                draft.year = +searchYear;
            }
        });

        setRevenueReportList(revenue_report?.revenue_results);
        setRoomCategories(revenue_report?.room_categories);

        let data = revenue_report?.revenue_results.map(item => {
            return {
                x: `${item.rate}%`, y: +item.rate
            }
        }).filter(item => item.y !== 0);

        setVisualData(data);
    }

    React.useEffect(() => {
        fetchRevenueReport();
    }, []);

    React.useEffect(() => {
        setTimeout(() => {
            setEndAngle(360);
        }, 100);
    }, []);

    return (
        <>
            <div className='revenue-report-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Báo cáo Doanh thu</span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Lọc kết quả</legend>
                            <div className='d-flex gap-3 px-4'>
                                <div className="form-group col-3">
                                    <label className='form-label'>Tháng:</label>
                                    <select className="form-select" onChange={(event) => setSearchMonth(event.target.value)}>
                                        <option key={`default-month`} value="0">Chọn tháng...</option>
                                        {
                                            [...Array(12)].map((item, index) => {
                                                return (
                                                    <option key={`month-${index + 1}`} value={`${index + 1}`}>{index + 1}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-group col-3">
                                    <label className='form-label'>Năm:</label>
                                    <select className="form-select" onChange={(event) => setSearchYear(event.target.value)}>
                                        <option key={`default-year`} value="0">Chọn năm...</option>
                                        <option key={`year-2023`} value="2023">2023</option>
                                        <option key={`year-2022`} value="2022">2022</option>
                                        <option key={`year-2021`} value="2021">2021</option>
                                        <option key={`year-2020`} value="2020">2020</option>
                                    </select>
                                </div>
                                <div className="form-group ms-3 col-6">
                                    <label className='form-label'>Thống kê:</label>
                                    <div className='d-flex gap-3'>
                                        <button className='btn btn-outline-primary' onClick={fetchRevenueReport}><MdFilterList /></button>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className='revenue-header text-center'>
                            <span className='title'>Tỉ lệ doanh thu theo loại phòng ({filterLabel.month ? `${filterLabel.month}/${filterLabel.year}` : searchYear})</span>
                        </div>
                        <div className='pie-chart d-flex justify-content-around pt-2 pb-3 red'>
                            <VictoryPie
                                animate={{
                                    duration: 2000
                                }}
                                endAngle={endAngle}
                                colorScale={PIE_CHART_COLORS}
                                data={visualData}
                                innerRadius={100}
                                style={{
                                    data: {
                                        fillOpacity: 0.9, stroke: "#FFFFFF", strokeWidth: 3
                                    },
                                    labels: {
                                        fontSize: 16, fill: "#D57834"
                                    }
                                }}
                            />
                            <div className='chart-note'>
                                {roomCategories && roomCategories.length > 0 &&
                                    roomCategories.map((item, index) => {
                                        return (
                                            <div key={`room-categories-revenue-type-${item.id}`}>
                                                <TbRectangleFilled className={`note-icon ${PIE_CHART_CLASS_COLORS[index % 8]}`} />
                                                <span className='ms-1'>{item.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Thống kê doanh thu</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên loại phòng</th>
                                    <th scope="col">Tỉ lệ</th>
                                    <th scope="col">Tổng doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueReportList && revenueReportList.length > 0 &&
                                    revenueReportList.map((item, index) => {
                                        return (
                                            <tr key={`room-category-revenue-${item.id}`}>
                                                <td>{item.name}</td>
                                                <td>{item.rate}%</td>
                                                <td>{CurrencyFormat(item.revenue_total)}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
        </>

    )
}

export default RevenueReport;