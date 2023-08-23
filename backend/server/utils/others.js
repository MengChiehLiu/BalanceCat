function buildHierarchy(items, parentId) {
    const children = items.filter(item => item.parent_id === parentId);
    if (children.length === 0) return null;
  
    const hierarchy = [];
    for (const child of children) {
        const subHierarchy = buildHierarchy(items, child.id);

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

function getRelatedIds(subject_id){
    let parent = Math.floor(subject_id / 100) * 100
    let grandparent = Math.floor(subject_id / 1000) * 1000
    if (subject_id >= 4000) return [subject_id, parent, grandparent, 3000, 3200]
    else return [subject_id, parent, grandparent]
};

class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = "CustomError";
    }
}


module.exports = {
    buildHierarchy: buildHierarchy,
    getRelatedIds: getRelatedIds,
    CustomError: CustomError
}