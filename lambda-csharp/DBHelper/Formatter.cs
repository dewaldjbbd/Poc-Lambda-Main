
using System.Data;
using System.Reflection;

namespace DBHelper
{
    public static class Formatter
    {
        private static readonly Dictionary<string, string> dictionary = new()
        {
            {
                "Content-Type",
                "application/json"},
            {
                "Access-Control-Allow-Headers",
                "access-control-allow-methods,access-control-allow-origin,authorization,client,content-type"},
            {
                "Access-Control-Allow-Origin",
                "*"},
            {
                "Access-Control-Allow-Methods",
                "OPTIONS,POST,GET,PUT,DELETE,PATCH"}
        };

        public static Dictionary<string, string> Headers = dictionary;

        public static Dictionary<object, object> FormatResponse(object statusCode, object data)
        {
            return new Dictionary<object, object> {
                {
                    "statusCode",
                    statusCode},
                {
                    "body",data},
                {
                    "headers",
                    Headers}};
        }

        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
    }
}
