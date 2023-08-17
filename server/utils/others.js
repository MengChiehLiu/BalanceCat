// function buildHierarchyIS(items, parentId) {
//     const children = items.filter(item => item.parent_id === parentId);
//     if (children.length === 0) return [null, 0];
  
//     const hierarchy = [];
//     let total = 0;
//     for (const child of children) {
//         const [subHierarchy, subtotal] = buildHierarchyIS(items, child.id);
//         child.amount = child.amount+subtotal
//         if (child.amount !== 0){
//             hierarchy.push({
//                 id: child.id,
//                 name: child.name,
//                 is_debit: child.is_debit,
//                 amount: child.amount,
//                 subjects: subHierarchy,
//             });
//             total += child.amount;
//         }
//     }
//     return [hierarchy, total];
// }

function buildHierarchyIS(items, parentId) {
    const hierarchy = [];

    for (const item of items) {
        if (item.parent_id === parentId) {
            const subSubjects = buildHierarchyIS(items, item.id);

            const subject = {
                id: item.id,
                name: item.name,
                is_debit: item.is_debit,
                amount: parseFloat(item.amount),
                subjects: subSubjects.length > 0 ? subSubjects : null
            };

            if (subSubjects.length > 0) {
                subject.amount += subSubjects.reduce((acc, curr) => acc + curr.amount, 0);
            }

            hierarchy.push(subject);
        }
    }

    return hierarchy;
}


function buildHierarchyFS(items, parentId) {
    const children = items.filter(item => item.parent_id === parentId);
    if (children.length === 0) return null;
  
    const hierarchy = [];
    for (const child of children) {
        const subHierarchy = buildHierarchyFS(items, child.id);

        hierarchy.push({
            id: child.id,
            name: child.name,
            is_debit: child.is_debit,
            amount: child.amount,
            subjects: subHierarchy,
        });

    }
    return hierarchy;
}

module.exports = {
    buildHierarchyIS: buildHierarchyIS,
    buildHierarchyFS: buildHierarchyFS
}