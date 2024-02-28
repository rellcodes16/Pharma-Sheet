import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useExpense } from '../Expenses/useExpense';

const LIGHT_MODE_COLORS = ["#0088FE", "#00C49F", "#3e64ff", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"];
const DARK_MODE_COLORS = ["#78909C", "#90A4AE", "#B0BEC5", "#CFD8DC", "#607D8B", "#546E7A", "#455A64", "#37474F", "#263238", "#1E272E"];

function ExpensePieChart({ isDarkMode }) {
    const { expense } = useExpense();
    const expenseData = expense.map(data => ({
        name: data.expense_name, 
        value: data.expense_price
    }));

    const colors = isDarkMode ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;

    return (
        <div>
            <ResponsiveContainer width='100%' height={300}>
            <h1 className="text-2xl dark:text-gray-400 text-gray-800 uppercase font-bold">Expense</h1>
                <PieChart>
                    <Pie
                        data={expenseData}
                        dataKey='value'
                        nameKey='name'
                        innerRadius={85}
                        outerRadius={110}
                        cx='50%'
                        cy='50%'
                        paddingAngle={3}
                    >
                        {expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpensePieChart;
