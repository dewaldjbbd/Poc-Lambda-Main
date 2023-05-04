using Amazon.Lambda.Core;
using DBHelper;
using Newtonsoft.Json;
using System.Text;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]


namespace CreateSetting
{
    public class Settings
    {

        /// <summary>
        /// Adds json object to the database
        /// </summary>
        /// <param name="input"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string Create(dynamic input, ILambdaContext context)
        {
            try
            {
                string stringtrim = input.ToString();
                var result = JsonConvert.DeserializeObject<Setting>(stringtrim.Replace(@"\", ""));
                if (result == null)
                {
                    return "Not Created, not valid";
                }
                context.Logger.LogLine(result.ToString());

                StringBuilder sqlString = new();
                sqlString.Append(" INSERT INTO setting (created_at, key, last_modified_at, version, name, value) ");
                sqlString.Append(" VALUES (");
                sqlString.Append("'" + DateTime.Now.ToString() + "',");
                sqlString.Append("'" + result.key + "',");
                sqlString.Append("'" + DateTime.Now.ToString() + "',");
                sqlString.Append("'" + result.version + "',");
                sqlString.Append("'" + result.name + "',");
                sqlString.Append("'" + result.value + "'");
                sqlString.Append(" )");

                if (DbHelper.ExecuteReader(sqlString.ToString()))
                    return "Created";
                else
                    return "Not Created";
            }
            catch (Exception ex)
            {
                return "Not Created " + ex.Message;
            }
        }
    }

}