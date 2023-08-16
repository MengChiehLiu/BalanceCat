function firstDateOfCurrentMonth() {
    const currentDate = new Date();
    const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDate;
}

function lastDateOfPreviousMonth() {
    const currentDate = new Date();
    const lastDateOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    return lastDateOfPreviousMonth;
}

function buildHierarchy(items, parentId) {
    const children = items.filter(item => item.parent_id === parentId);
    if (children.length === 0) return [null, 0];
  
    const hierarchy = [];
    let total = 0;
    for (const child of children) {
        const [subHierarchy, subtotal] = buildHierarchy(items, child.id);
        child.amount = child.amount+subtotal
        if (child.amount !== 0){
            hierarchy.push({
                id: child.id,
                name: child.name,
                is_debit: child.is_debit,
                amount: child.amount,
                subjects: subHierarchy,
            });
            total += child.amount;
        }
    }
    return [hierarchy, total];
}

module.exports = {
    firstDateOfCurrentMonth: firstDateOfCurrentMonth,
    lastDateOfPreviousMonth: lastDateOfPreviousMonth,
    buildHierarchy: buildHierarchy
}