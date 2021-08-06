const splitPsqlParts = rawParam => {
  if (!rawParam) throw new Error("No db name specified");
  if (rawParam.includes("/")) {
    const [psqlName, dbName] = rawParam.split("/");
    return { psqlName, dbName };
  } else return { dbName: rawParam, psqlName: "localhost" };
};

const splitS3Parts = rawParam => {
  if (!rawParam) throw new Error("No filename specified");
  if (rawParam.includes("/")) {
    const [s3Name, fileName] = rawParam.split("/");
    return { s3Name, fileName };
  } else return { fileName: rawParam, s3Name: null };
};

module.exports = { splitPsqlParts, splitS3Parts };
