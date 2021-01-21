
export default (table, definition) => {
  const data = definition
      .map((item) => Object.assign({}, item))
      .map((item) => {
        const {Field, Type, Null, Key, Extra} = item;
        return `${Field} ${Type} ${checkKey(Key)} ${checkNull(Null)} ${Extra}`;
      })
      .join(',\n  ');
  return `CREATE TABLE ${table} (\n  ${data}\n)`;
};

function checkKey(key) {
  if (key.toUpperCase() === 'PRI') return 'PRIMARY KEY';
  if (key.toUpperCase() === 'UNI') return 'UNIQUE';

  return '';
}

function checkNull(nullConstraint) {
  return nullConstraint.toUpperCase() === 'NO' ? 'NOT NULL' : 'NULL';
}
