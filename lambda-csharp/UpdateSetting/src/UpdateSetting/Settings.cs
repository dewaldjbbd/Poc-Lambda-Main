using System.Net;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using System.Data;
using DBHelper;
using Newtonsoft.Json;
using System.Text;
using System.Linq;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace UpdateSetting
{
    public class Settings
    {
        /// <summary>
        /// Update setting
        /// </summary>
        /// <param name="request"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public static APIGatewayHttpApiV2ProxyResponse Update(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                if (request == null)
                    return new APIGatewayHttpApiV2ProxyResponse
                    {
                        StatusCode = (int)HttpStatusCode.BadRequest,
                        Body = "No request",
                        Headers = Formatter.Headers
                    };

                else
                {
                    if (request.PathParameters == null)
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "No Path Parameters",
                            Headers = Formatter.Headers
                        };

                    if (!request.PathParameters.TryGetValue("id", out var id))
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "Invalid Path Parameters",
                            Headers = Formatter.Headers
                        };

                    if (id == null)
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "Invalid Path Parameters",
                            Headers = Formatter.Headers
                        };

                    var setting = new Setting();
                    try
                    {
                        setting = JsonConvert.DeserializeObject<Setting>(request.Body.Replace(@"\", ""));
                    }
                    catch (Exception ex)
                    {
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "DeserializeObject Exception: " + ex.Message,
                            Headers = Formatter.Headers
                        };
                    }
                    string sqlString = @"
                                SELECT ID ,
	                            VERSION ,
	                            KEY ,
	                            NAME ,
	                            VALUE ,
	                            TO_CHAR(LAST_MODIFIED_AT,

		                            'YYYY-MM-DD""T""HH24:MI:SS""Z""') AS LAST_MODIFIED_AT ,
	                            TO_CHAR(CREATED_AT,

		                            'YYYY-MM-DD""T""HH24:MI:SS""Z""') AS CREATED_AT
                            FROM SETTING
                            WHERE 
                                ID = " + id.ToString();

                    DataTable? dt = DbHelper.GetDataTable(sqlString);

                    if (dt == null || dt.Rows.Count == 0)
                    {
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.NotFound,
                            Body = "No record found",
                            Headers = Formatter.Headers
                        };
                    }

                    if (setting == null)
                    {
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.NotFound,
                            Body = "No body found",
                            Headers = Formatter.Headers
                        };
                    }
                    sqlString = " UPDATE setting SET ";
                    sqlString += " key = '" + setting.key + "', ";
                    sqlString += " name = '" + setting.name + "', ";
                    sqlString += " value = '" + setting.value + "', ";
                    sqlString += " last_modified_at = '" + DateTime.Now.ToString() + "' ";
                    sqlString += " WHERE id = " + id.ToString();

                    if (DbHelper.ExecuteReader(sqlString.ToString()))
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.NoContent,
                            Body = sqlString,//"Updated",
                            Headers = Formatter.Headers
                        };
                    else
                        return new APIGatewayHttpApiV2ProxyResponse
                        {
                            StatusCode = (int)HttpStatusCode.BadRequest,
                            Body = "Error when updating",
                            Headers = Formatter.Headers
                        };

                }

            }
            catch (Exception ex)
            {
                return new APIGatewayHttpApiV2ProxyResponse
                {
                    StatusCode = (int)HttpStatusCode.BadRequest,
                    Body = "Exception: " + ex.Message,
                    Headers = Formatter.Headers
                };
            }
        }
    }

    public record Casing(string Lower, string Upper);
}