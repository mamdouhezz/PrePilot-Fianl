import { CampaignReport, KpiSet, SocialPlatformId } from '../../types';
import { ColumnConfig, PlatformKPIs } from '../../types/media-plan';
import { PLATFORM_INFO } from '../../constants';

/**
 * Dynamically determines which columns to display based on campaign goals.
 * @param report - The full campaign report.
 * @returns An ordered array of ColumnConfig objects.
 */
export function selectColumns(report: CampaignReport): ColumnConfig[] {
    const baseColumns: ColumnConfig[] = [
        { key: 'platform', label: 'المنصة', type: 'platform', sortable: true },
        { key: 'budget', label: 'الميزانية', type: 'currency', sortable: true },
        { key: 'percentage', label: 'التوزيع', type: 'percentage', sortable: true },
        { key: 'ctr', label: 'CTR', type: 'percentage', sortable: true },
        { key: 'cpc', label: 'CPC', type: 'currency', sortable: true },
        { key: 'roas', label: 'ROAS', type: 'roas', sortable: true },
    ];

    const conditionalColumns: ColumnConfig[] = [];

    if (report.goals.includes('Awareness / Brand Recognition')) {
        conditionalColumns.push(
            { key: 'impressions', label: 'مرات الظهور', type: 'number', sortable: true },
            { key: 'cpm', label: 'CPM', type: 'currency', sortable: true }
        );
    }

    if (report.goals.includes('Sales / Conversions') || report.goals.includes('Leads Generation')) {
        conditionalColumns.push(
            { key: 'conversions', label: 'التحويلات', type: 'number', sortable: true },
            { key: 'cvr', label: 'CVR', type: 'percentage', sortable: true },
            { key: 'cpa', label: 'CPA', type: 'currency', sortable: true }
        );
    }
    
    const advancedColumns: ColumnConfig[] = [
        { key: 'cac', label: 'CAC', type: 'currency', sortable: true, isAdvanced: true },
        { key: 'arpu', label: 'ARPU', type: 'currency', sortable: true, isAdvanced: true },
        { key: 'revenue', label: 'الإيرادات', type: 'currency', sortable: true, isAdvanced: true }
    ];

    const uniqueConditional = conditionalColumns.filter(cc => !baseColumns.some(bc => bc.key === cc.key));

    return [...baseColumns, ...uniqueConditional, ...advancedColumns];
}

/**
 * Transforms the raw report data into a structured format for the table.
 * @param report - The full campaign report.
 * @returns An array of PlatformKPIs.
 */
export function calculatePlatformData(report: CampaignReport): PlatformKPIs[] {
    const totalBudget = report.kpis.totals.budget;
    return Object.entries(report.kpis.perPlatform).map(([platformId, kpis]) => {
        const platformInfo = PLATFORM_INFO[platformId as SocialPlatformId];
        const budget = report.budgetAllocation[platformId] || 0;
        const percentage = totalBudget > 0 ? (budget / totalBudget) * 100 : 0;
        return {
            platform: platformId as SocialPlatformId,
            name: platformInfo.name,
            icon: platformInfo.icon,
            color: platformInfo.color,
            budget,
            percentage,
            kpis,
        };
    });
}

/**
 * Filters columns based on the 'showAdvanced' flag.
 * @param allColumns - The complete array of column configurations.
 * @param showAdvanced - Boolean flag to indicate if advanced columns should be shown.
 * @returns A filtered array of ColumnConfig.
 */
export function getVisibleColumns(allColumns: ColumnConfig[], showAdvanced: boolean): ColumnConfig[] {
    if (showAdvanced) return allColumns;
    return allColumns.filter(col => !col.isAdvanced);
}

/**
 * Performs client-side sorting of the platform data.
 * @param data - The array of platform data to sort.
 * @param columnKey - The key of the column to sort by.
 * @param direction - The sort direction ('asc' or 'desc').
 * @returns A new, sorted array of PlatformKPIs.
 */
export function sortData(data: PlatformKPIs[], columnKey: keyof KpiSet | 'platform' | 'budget' | 'percentage' | null, direction: 'asc' | 'desc'): PlatformKPIs[] {
    if (!columnKey) return data;

    const sorted = [...data].sort((a, b) => {
        let valA, valB;
        if (columnKey === 'platform') {
            valA = a.name;
            valB = b.name;
        } else if (columnKey === 'budget') {
            valA = a.budget;
            valB = b.budget;
        } else if (columnKey === 'percentage') {
            valA = a.percentage;
            valB = b.percentage;
        } else {
            valA = a.kpis[columnKey as keyof KpiSet];
            valB = b.kpis[columnKey as keyof KpiSet];
        }

        if (typeof valA === 'string' && typeof valB === 'string') {
            return valA.localeCompare(valB, 'ar');
        }
        if (typeof valA === 'number' && typeof valB === 'number') {
            return valA - valB;
        }
        return 0;
    });

    if (direction === 'desc') {
        return sorted.reverse();
    }
    return sorted;
}

/**
 * Utility to consistently format numbers for display.
 * @param value - The numeric value to format.
 * @param type - The type of formatting to apply.
 * @returns A formatted string.
 */
export function formatKPIValue(value: number | undefined, type: ColumnConfig['type']): string {
    if (value === undefined || value === null || isNaN(value)) return 'N/A';
    switch (type) {
        case 'currency': return `${value.toLocaleString('ar-SA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ريال`;
        case 'percentage': return `${value.toFixed(2)}%`;
        case 'roas': return `${value.toFixed(2)}x`;
        case 'number': return value.toLocaleString('ar-SA');
        default: return String(value);
    }
}
